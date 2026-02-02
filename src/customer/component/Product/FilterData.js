export const color = [
    "white",
    "black",
    "Red",
    "Marun",
    "Pink",
    "Green",
    "Yellow"
];
export const filters = [
    {
        id:"color",
        name:"Color",
        Option: [
            {values:"white", label:"White"},
            {values:"yellow", label:"Yellow"},
            {values:"blue", label:"Blue"},
            {values:"black", label:"Black"},
            {values:"red", label:"Red"},
            {values:"pink", label:"Pink"},
            {values:"green", label:"Green"},
            {values:"purple", label:"Purple"},

        ]
    },
    {
        id:"size",
        name:"CoSizelor",
        Option: [
            {values:"S", label:"S"},
            {values:"M", label:"M"},
            {values:"L", label:"L"},
            

        ]
    }
];

export const singleFilter = [
    {
        id:"price",
        name:"Price",
        Option: [
            {values:"159-399", label:"Rs.159 To Rs.399"},
            {values:"399-999", label:"Rs.399 To Rs.999"},
            {values:"999-1999", label:"Rs.999 To Rs.1999"},
            {values:"1999-2999", label:"Rs.1999 To Rs.2999"},
            {values:"2999-3999", label:"Rs.2999 To Rs.3999"},
            {values:"3999-4999", label:"Rs.3999 To Rs.4999"},
        ]
    },
    {
        id:"discount",
        name:"Discount Range",
        Option: [
            {values:"10", label:"10% And Above"},
            {values:"20", label:"20% And Above"},
            {values:"30", label:"30% And Above"},
            {values:"40", label:"40% And Above"},
            {values:"50", label:"50% And Above"},
            {values:"60", label:"60% And Above"},
            {values:"70", label:"70% And Above"},
            {values:"80", label:"80% And Above"},
        ]
    },
    {
        id:"stock",
        name:"Availability",
        Option: [
            {values:"in_stock", label:"In Stock"},
            {values:"out_stock", label:"Out of Stock"},
        
        ]
    },
]