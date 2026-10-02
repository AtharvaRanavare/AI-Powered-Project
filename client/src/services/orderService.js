import api from './api.js';

const LOCAL_ORDERS_KEY = 'quickcart_customer_orders';

export const orderService = {
  // Create a new order
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      const created = response.data.order || response.data;
      
      // Keep a local copy for seamless offline/standalone demo persistence
      this.saveLocalOrder(created);

      return { success: true, order: created };
    } catch {
      // Local fallback for frontend testing when backend is not running
      const newOrder = {
        _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        orderItems: orderData.orderItems || [],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
        itemsPrice: orderData.itemsPrice || 0,
        shippingPrice: orderData.shippingPrice || 0,
        totalPrice: orderData.totalPrice || 0,
        isPaid: false,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      this.saveLocalOrder(newOrder);

      return { success: true, order: newOrder, isDemo: true };
    }
  },

  // Fetch orders for currently logged in customer
  async getMyOrders() {
    try {
      const response = await api.get('/orders/myorders');
      const orders = response.data.orders || response.data || [];
      return { success: true, orders };
    } catch {
      // Fallback: Read from local storage
      const localOrders = this.getLocalOrders();
      return { success: true, orders: localOrders, isDemo: true };
    }
  },

  // Fetch single order details by id
  async getOrderById(id) {
    try {
      const response = await api.get(`/orders/${id}`);
      return { success: true, order: response.data.order || response.data };
    } catch {
      const localOrders = this.getLocalOrders();
      const found = localOrders.find((o) => o._id === id || String(o._id) === String(id));
      if (found) {
        return { success: true, order: found, isDemo: true };
      }
      return { success: false, error: 'Order not found' };
    }
  },

  // Helper to save order to local storage
  saveLocalOrder(order) {
    try {
      const existing = this.getLocalOrders();
      const updated = [order, ...existing.filter((o) => o._id !== order._id)];
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving order to localStorage:', e);
    }
  },

  // Helper to get local orders
  getLocalOrders() {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },
};

export default orderService;
