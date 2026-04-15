import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Filter } from "lucide-react";
import { payments } from "@/data/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PaymentsPage = () => {
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
  const filtered = filter === "All" ? payments : payments.filter((p) => p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground font-body mt-1">Track all payment transactions</p>
        </div>
        <div className="flex gap-2">
          {(["All", "Completed", "Pending"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
              className="font-body rounded-lg"
            >
              {s === "All" && <Filter className="h-3.5 w-3.5 mr-1.5" />}
              {s}
            </Button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border/50">
                <th className="pb-3 font-medium">Payment ID</th>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 font-medium text-foreground">{p.id}</td>
                  <td className="py-3.5">{p.orderId}</td>
                  <td className="py-3.5 font-semibold">${p.amount.toFixed(2)}</td>
                  <td className="py-3.5">
                    <Badge variant="outline" className="bg-muted/50 font-normal">
                      <CreditCard className="h-3 w-3 mr-1.5" />
                      {p.method}
                    </Badge>
                  </td>
                  <td className="py-3.5">
                    <Badge className={p.status === "Completed" ? "bg-success/10 text-success border-success/20 hover:bg-success/20" : "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"}>
                      {p.status}
                    </Badge>
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

export default PaymentsPage;
