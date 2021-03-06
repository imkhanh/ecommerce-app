const Orders = require('../models/orders');

const orderController = {
	getAllOrders: async (req, res) => {
		try {
			const orders = await Orders.find({}).populate('allProduct.id', 'title images price').populate('user', 'name email').sort({ _id: -1 });
			if (orders) {
				return res.json({ orders });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getSingleOrder: async (req, res) => {
		try {
			const { userId } = req.body;
			const order = await Orders.find({ user: userId }).populate('allProduct.id', 'title images price').populate('user', 'name email').sort({ _id: -1 });
			if (order) {
				return res.json({ order });
			}
		} catch (error) {
			console.log(error);
		}
	},
	createOrder: async (req, res) => {
		try {
			const { allProduct, user, amount, transactionId, address, phone } = req.body;
			if (!(allProduct && user && amount && transactionId && address && phone)) {
				return res.json({ error: 'Please fill all the fields' });
			}

			const newOrder = new Orders({ allProduct, user, amount, transactionId, address, phone });

			await newOrder.save();

			return res.json({ success: 'Order created successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	editOrder: async (req, res) => {
		try {
			const { status } = req.body;

			const currentOrder = await Orders.findByIdAndUpdate({ _id: req.params.id }, { status: status, updatedAt: Date.now() }, { new: true });

			if (currentOrder) {
				return res.json({ success: 'Order edited successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteOrder: async (req, res) => {
		try {
			await Orders.findByIdAndDelete(req.params.id);

			return res.json({ success: 'Order deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = orderController;
