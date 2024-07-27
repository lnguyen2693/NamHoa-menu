/**
restaurants (collection):
  NamHoa:
    address: string
    contact: 

    menu (collection):
      item-1:
        name: nuoc cam
        category: string
        price: 30.000 đ
        image: storage address (string)
        addresses: 
        options: key-choice type
          [key: string] : 
            choice: string[]
            required: T/F
            multipleChoice: T/F

    orders (collection)
      [oderId]:
        active: true
        table: 5
        totalPrice: int // bai bai
        timestamp
        orderItems: []
        OrderedItems (collection):
          OrderedItem: [{ 
          // store item ID only or store needed info only? 
          // --> store ID: sau co the connect de track so luong mon trong kho
            id: // bo cai di, identify w itemID and options
            itemID: 
            item: name of item
            price: 
            options: 
            amount
          }]    


staffs (collection):
  [ID]:
    name: string
    contact: string
 */

export interface Restaurant {
  name: string;
  address: string;
  contact: {
    number: string;
  };
  // menu (collection)
  // orders (collection)
}

interface ItemOption {
  [key: string]: {
    choice: string;
    required: boolean;
    multipleChoice: boolean;
  };
}

export interface MenuItem {
  name: string;
  category: string;
  price: number;
  image?: string;
  options?: ItemOption;
}

export interface Order {
  active: boolean;
  table: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  itemID: string;
  name: string;
  price: number;
  options: Record<string, string[]>;
  amount: number;
}

export interface Staff {
  name: string;
  contact: string;
}
