export const recentOrders = [
  { id: "ORD-001", customer: "Alice Johnson", items: "Grilled Salmon, Caesar Salad", total: 48.50, status: "Completed", time: "2 min ago" },
  { id: "ORD-002", customer: "Bob Chen", items: "Wagyu Steak, Truffle Fries", total: 95.00, status: "Preparing", time: "5 min ago" },
  { id: "ORD-003", customer: "Clara Davis", items: "Margherita Pizza, Tiramisu", total: 32.00, status: "Completed", time: "12 min ago" },
  { id: "ORD-004", customer: "David Kim", items: "Lobster Risotto", total: 62.00, status: "Pending", time: "15 min ago" },
  { id: "ORD-005", customer: "Emma Wilson", items: "Pasta Carbonara, Wine", total: 44.50, status: "Completed", time: "20 min ago" },
  { id: "ORD-006", customer: "Frank Lee", items: "Sushi Platter, Miso Soup", total: 78.00, status: "Preparing", time: "25 min ago" },
];

export const ordersPerDay = [
  { day: "Mon", orders: 42, revenue: 2840 },
  { day: "Tue", orders: 38, revenue: 2560 },
  { day: "Wed", orders: 55, revenue: 3720 },
  { day: "Thu", orders: 47, revenue: 3180 },
  { day: "Fri", orders: 68, revenue: 4590 },
  { day: "Sat", orders: 82, revenue: 5540 },
  { day: "Sun", orders: 73, revenue: 4930 },
];

export const payments = [
  { id: "PAY-001", orderId: "ORD-001", amount: 48.50, method: "Card", status: "Completed" },
  { id: "PAY-002", orderId: "ORD-002", amount: 95.00, method: "UPI", status: "Completed" },
  { id: "PAY-003", orderId: "ORD-003", amount: 32.00, method: "Cash", status: "Completed" },
  { id: "PAY-004", orderId: "ORD-004", amount: 62.00, method: "Card", status: "Pending" },
  { id: "PAY-005", orderId: "ORD-005", amount: 44.50, method: "UPI", status: "Completed" },
  { id: "PAY-006", orderId: "ORD-006", amount: 78.00, method: "Cash", status: "Pending" },
  { id: "PAY-007", orderId: "ORD-007", amount: 120.00, method: "Card", status: "Completed" },
  { id: "PAY-008", orderId: "ORD-008", amount: 55.00, method: "UPI", status: "Pending" },
  { id: "PAY-009", orderId: "ORD-009", amount: 88.00, method: "Card", status: "Completed" },
  { id: "PAY-010", orderId: "ORD-010", amount: 42.00, method: "Cash", status: "Completed" },
];

export const topSellingItems = [
  { name: "Wagyu Steak", orders: 156, revenue: 14820 },
  { name: "Grilled Salmon", orders: 134, revenue: 6432 },
  { name: "Lobster Risotto", orders: 98, revenue: 6076 },
  { name: "Truffle Fries", orders: 87, revenue: 1305 },
  { name: "Tiramisu", orders: 76, revenue: 912 },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 62000 },
];
