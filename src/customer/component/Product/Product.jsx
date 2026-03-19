import ProductCard from './ProductCard'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import {
  Dialog, DialogBackdrop, DialogPanel,
  Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { filters, singleFilter, getSizesForCategory } from './FilterData'
import { findProducts } from '../../../State/Product/Action';
import Pagination from '@mui/material/Pagination';

const sortOptions = [
  { label: 'None',               value: null         },
  { label: 'Price: Low to High', value: 'price_low'  },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Newest First',       value: 'newest'     },
  { label: 'Discount',           value: 'discount'   },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections]           = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const params   = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  // ── Read URL params ──────────────────────────────────────────────
  const searchParams = new URLSearchParams(decodeURIComponent(location.search));
  const colorValues  = searchParams.getAll("color");
  const sizeValues   = searchParams.getAll("size");
  const priceValue   = searchParams.get("price");
  const discount     = searchParams.get("discount");
  const sortValue    = searchParams.get("sort") || null;
  const pageNumber   = searchParams.get("page") || 1;
  const stock        = searchParams.get("stock");

  // ✅ Get category-specific sizes dynamically
  const categorySizes = getSizesForCategory(params.levelThree);

  // ── Build the full filter list with dynamic size injected ────────
  // Size filter is a checkbox filter placed right after Color
  const allCheckboxFilters = [
    ...filters, // Color (and any other static checkbox filters)
    {
      id: "size",
      name: "Size",
      Option: categorySizes,
    },
  ];

  // ── Section toggle ────────────────────────────────────────────────
  const toggleSection        = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  const isSectionOpen        = (id) => !!openSections[id];
  const isFilterActive       = (sectionId, value) =>
    searchParams.getAll(sectionId).map(v => v.toLowerCase()).includes(value.toLowerCase());
  const isSingleFilterActive = (sectionId, value) =>
    searchParams.get(sectionId) === value;

  // ── Handlers ─────────────────────────────────────────────────────
  const handleFilter = (value, sectionId) => {
    const sp = new URLSearchParams(decodeURIComponent(location.search));
    const normalized = sectionId === "color" ? value.toLowerCase() : value;
    let values = sp.getAll(sectionId).map(v => sectionId === "color" ? v.toLowerCase() : v);
    if (values.includes(normalized)) values = values.filter(v => v !== normalized);
    else values.push(normalized);
    sp.delete(sectionId);
    values.forEach(v => sp.append(sectionId, v));
    sp.set("page", 1);
    navigate({ search: `?${sp.toString()}` });
  };

  const handleRadio = (value, sectionId) => {
    const sp = new URLSearchParams(decodeURIComponent(location.search));
    if (sp.get(sectionId) === value) sp.delete(sectionId);
    else sp.set(sectionId, value);
    sp.set("page", 1);
    navigate({ search: `?${sp.toString()}` });
  };

  const handleSort = (value) => {
    const sp = new URLSearchParams(decodeURIComponent(location.search));
    if (value === null) sp.delete("sort");
    else sp.set("sort", value);
    sp.set("page", 1);
    navigate({ search: `?${sp.toString()}` });
  };

  const handlePagination = (event, value) => {
    const sp = new URLSearchParams(decodeURIComponent(location.search));
    sp.set("page", value);
    navigate({ search: `?${sp.toString()}` });
  };

  const handleClearAll = () => navigate({ search: '' });

  // ── Fetch products ────────────────────────────────────────────────
  useEffect(() => {
    const [minPrice, maxPrice] = priceValue === null
      ? [0, 100000]
      : priceValue.split("-").map(Number);

    dispatch(findProducts({
      category:    params.levelThree,
      colors:      colorValues.map(c => c.toLowerCase()),
      sizes:       sizeValues,
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort:        sortValue,
      pageNumber:  pageNumber - 1,
      pageSize:    10,
      stock,
    }));
  }, [params.levelThree, location.search]);

  // ── When category changes, clear size filters (they may be invalid) ──
  useEffect(() => {
    const sp = new URLSearchParams(decodeURIComponent(location.search));
    if (sp.has("size")) {
      sp.delete("size");
      sp.set("page", 1);
      navigate({ search: `?${sp.toString()}` }, { replace: true });
    }
  }, [params.levelThree]);

  const activeFilterCount = [
    ...colorValues, ...sizeValues, priceValue, discount, stock,
  ].filter(Boolean).length;

  // ── Filter Panel (shared between desktop + mobile) ───────────────
  const FilterPanel = () => (
    <>
      {/* Checkbox filters: Color + dynamic Size */}
      {allCheckboxFilters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-4">
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="flex w-full items-center justify-between py-2 text-sm text-gray-400 hover:text-gray-500"
          >
            <span className="font-medium text-gray-900 flex items-center gap-2">
              {section.name}

              {/* ✅ Show size label hint next to "Size" heading */}
              {section.id === "size" && (
                <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {getSizeLabel(params.levelThree)}
                </span>
              )}

              {searchParams.getAll(section.id).length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  {searchParams.getAll(section.id).length}
                </span>
              )}
            </span>
            <span className="ml-6 flex items-center">
              {isSectionOpen(section.id) ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}
            </span>
          </button>

          {isSectionOpen(section.id) && (
            <div className="pt-3 space-y-2">
              {section.Option.map((option) => {
                const active = isFilterActive(section.id, option.values);
                return (
                  <div
                    key={option.values}
                    onClick={() => handleFilter(option.values, section.id)}
                    className={classNames(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all select-none",
                      active
                        ? "bg-indigo-50 border border-indigo-300"
                        : "hover:bg-gray-50 border border-transparent"
                    )}
                  >
                    {section.id === "color" && (
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: option.values.toLowerCase() }}
                      />
                    )}
                    <input
                      readOnly type="checkbox" checked={active}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 pointer-events-none"
                    />
                    <span className={classNames(
                      "text-sm flex-1",
                      active ? "text-indigo-700 font-medium" : "text-gray-600"
                    )}>
                      {option.label}
                    </span>
                    {active && <XMarkIcon className="h-3.5 w-3.5 text-indigo-400" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Radio filters: Price, Discount, Availability */}
      {singleFilter.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-4">
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="flex w-full items-center justify-between py-2 text-sm text-gray-400 hover:text-gray-500"
          >
            <span className="font-medium text-gray-900 flex items-center gap-2">
              {section.name}
              {searchParams.get(section.id) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  1
                </span>
              )}
            </span>
            <span className="ml-6 flex items-center">
              {isSectionOpen(section.id) ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}
            </span>
          </button>

          {isSectionOpen(section.id) && (
            <div className="pt-3 space-y-2">
              {section.Option.map((option) => {
                const active = isSingleFilterActive(section.id, option.values);
                return (
                  <div
                    key={option.values}
                    onClick={() => handleRadio(option.values, section.id)}
                    className={classNames(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all select-none",
                      active
                        ? "bg-indigo-50 border border-indigo-300"
                        : "hover:bg-gray-50 border border-transparent"
                    )}
                  >
                    <input
                      readOnly type="radio" checked={active}
                      className="h-4 w-4 border-gray-300 text-indigo-600 pointer-events-none"
                    />
                    <span className={classNames(
                      "text-sm flex-1",
                      active ? "text-indigo-700 font-medium" : "text-gray-600"
                    )}>
                      {option.label}
                    </span>
                    {active && <XMarkIcon className="h-3.5 w-3.5 text-indigo-400" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="bg-white">

      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel transition className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button type="button" onClick={() => setMobileFiltersOpen(false)}
                className="flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50">
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="px-4"><FilterPanel /></div>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top bar */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {params.levelThree
                ? params.levelThree.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                : "All Products"}
            </h1>
            {products.products?.totalElements > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                {products.products.totalElements} products
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
                <span>Sort: </span>
                <span className="text-indigo-600 font-semibold">
                  {sortOptions.find(o => o.value === sortValue)?.label || "None"}
                </span>
                <ChevronDownIcon className="size-4 text-gray-400" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.label}>
                      <button onClick={() => handleSort(option.value)}
                        className={classNames(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors",
                          sortValue === option.value
                            ? "bg-indigo-50 text-indigo-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        )}>
                        <span className="flex items-center justify-between">
                          {option.label}
                          {sortValue === option.value && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                        </span>
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            {/* Mobile filter button */}
            <button type="button" onClick={() => setMobileFiltersOpen(true)}
              className="relative p-2 text-gray-400 hover:text-gray-500 lg:hidden">
              <FunnelIcon className="size-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-3 border-b border-gray-100">
            <span className="text-xs text-gray-500 font-medium">Active:</span>
            {colorValues.map(v => (
              <button key={v} onClick={() => handleFilter(v, "color")}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200 hover:bg-indigo-100">
                {v} <XMarkIcon className="h-3 w-3" />
              </button>
            ))}
            {sizeValues.map(v => (
              <button key={v} onClick={() => handleFilter(v, "size")}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200 hover:bg-indigo-100">
                Size: {v} <XMarkIcon className="h-3 w-3" />
              </button>
            ))}
            {priceValue && (
              <button onClick={() => handleRadio(priceValue, "price")}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200 hover:bg-indigo-100">
                ₹{priceValue.replace("-", "–₹")} <XMarkIcon className="h-3 w-3" />
              </button>
            )}
            {discount && (
              <button onClick={() => handleRadio(discount, "discount")}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200 hover:bg-indigo-100">
                {discount}% off <XMarkIcon className="h-3 w-3" />
              </button>
            )}
            <button onClick={handleClearAll}
              className="ml-auto text-xs text-red-500 hover:text-red-700 font-medium underline">
              Clear all
            </button>
          </div>
        )}

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <div className="py-4 flex justify-between items-center border-b border-gray-200">
                <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FilterListIcon fontSize="small" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </h1>
                {activeFilterCount > 0 && (
                  <button onClick={handleClearAll} className="text-xs text-red-500 hover:text-red-700 font-medium">
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel />
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {products.loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
                </div>
              ) : products.products?.content?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-gray-400 text-lg font-medium">No products found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                  <button onClick={handleClearAll}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4 py-5">
                  {products.products?.content?.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pagination */}
        {products.products?.totalPages > 1 && (
          <section className="w-full px-4 py-5 flex justify-center border-t border-gray-100">
            <Pagination
              count={products.products?.totalPages}
              page={Number(pageNumber)}
              color="secondary"
              onChange={handlePagination}
              shape="rounded"
            />
          </section>
        )}

      </main>
    </div>
  );
}

// ── Helper: human-readable label for the size system in use ──────
function getSizeLabel(categorySlug) {
  if (!categorySlug) return "S / M / L";
  const slug = categorySlug.toLowerCase();

  if (/shoe|sandal|boot|sneaker|loafer|flat|heel|slipper|flip/.test(slug)) return "UK sizes";
  if (/jean|trouser|short|jogger|pant/.test(slug))  return "Waist sizes";
  if (/kid|boy|girl|infant|baby/.test(slug))        return "Age sizes";
  if (/bra|lingerie|innerwear/.test(slug))          return "Innerwear sizes";
  if (/bag|wallet|belt|watch|jewel|sunglass/.test(slug)) return "One size";
  if (/mobile|laptop|tablet|storage/.test(slug))   return "Storage";
  if (/bed|sofa|mattress|curtain|sheet/.test(slug)) return "Dimensions";
  return "S / M / L";
}