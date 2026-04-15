import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { topSellingItems, monthlyRevenue } from "@/data/dummy-data";

const COLORS = ["hsl(36,80%,50%)", "hsl(152,60%,42%)", "hsl(220,70%,55%)", "hsl(280,60%,55%)", "hsl(0,72%,51%)"];

const stats = [
  { label: "Total Revenue", value: "$295,000", icon: DollarSign, color: "bg-success/10 text-success" },
  { label: "Avg Order Value", value: "$47.80", icon: TrendingUp, color: "bg-primary/10 text-primary" },
  { label: "Top Selling", value: "Wagyu Steak", icon: Award, color: "bg-violet-500/10 text-violet-500" },
];

const pieData = topSellingItems.map((i) => ({ name: i.name, value: i.orders }));

const Reports = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground font-body mt-1">Analytics and performance insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 hover:shadow-xl transition-shadow">
            <div className={`p-3 rounded-lg ${s.color} w-fit mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground font-body">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152,60%,42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152,60%,42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
              <XAxis dataKey="month" stroke="hsl(220,10%,46%)" fontSize={12} />
              <YAxis stroke="hsl(220,10%,46%)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(152,60%,42%)" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">Top Selling Items</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Items Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Top Selling Items Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border/50">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Item</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topSellingItems.map((item, i) => (
                <tr key={item.name} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-3">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold" style={{ backgroundColor: COLORS[i], color: "#fff" }}>{i + 1}</span>
                  </td>
                  <td className="py-3 font-medium text-foreground">{item.name}</td>
                  <td className="py-3">{item.orders}</td>
                  <td className="py-3 font-semibold">${item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
