import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Users, UserCog, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ordersPerDay, recentOrders } from "@/data/dummy-data";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Orders", value: "1,284", icon: ShoppingCart, change: "+12.5%", color: "bg-primary/10 text-primary" },
  { label: "Total Revenue", value: "$48,390", icon: DollarSign, change: "+8.2%", color: "bg-success/10 text-success" },
  { label: "Total Clients", value: "846", icon: Users, change: "+5.1%", color: "bg-blue-500/10 text-blue-500" },
  { label: "Total Employees", value: "32", icon: UserCog, change: "+2", color: "bg-violet-500/10 text-violet-500" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Welcome back. Here's today's overview.</p>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="glass rounded-xl p-5 hover:shadow-xl transition-shadow duration-300 group cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${s.color} transition-transform group-hover:scale-110`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-success font-body">
                <TrendingUp className="h-3 w-3 mr-1" /> {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground font-body">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">Orders Per Day</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="day" stroke="hsl(220,10%,46%)" fontSize={12} />
              <YAxis stroke="hsl(220,10%,46%)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }} />
              <Bar dataKey="orders" fill="hsl(36,80%,50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ordersPerDay}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(36,80%,50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(36,80%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="day" stroke="hsl(220,10%,46%)" fontSize={12} />
              <YAxis stroke="hsl(220,10%,46%)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(36,80%,50%)" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border/50">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium hidden md:table-cell">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 hidden md:table-cell text-muted-foreground">{order.items}</td>
                  <td className="py-3 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-3">
                    <Badge variant={order.status === "Completed" ? "default" : order.status === "Preparing" ? "secondary" : "outline"} className={order.status === "Completed" ? "bg-success/10 text-success border-success/20 hover:bg-success/20" : order.status === "Preparing" ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" : "bg-muted text-muted-foreground"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 hidden sm:table-cell text-muted-foreground">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{order.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
