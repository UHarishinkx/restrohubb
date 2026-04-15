import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  role: string;
  shift: string;
  kitchenId: string;
}

const initialData: Employee[] = [
  { id: "E-001", name: "Rajesh Kumar", role: "Head Chef", shift: "Morning", kitchenId: "K-01" },
  { id: "E-002", name: "Priya Sharma", role: "Sous Chef", shift: "Evening", kitchenId: "K-02" },
  { id: "E-003", name: "Amit Patel", role: "Line Cook", shift: "Morning", kitchenId: "K-01" },
  { id: "E-004", name: "Sneha Reddy", role: "Waiter", shift: "Evening", kitchenId: "K-03" },
  { id: "E-005", name: "Vikram Singh", role: "Cashier", shift: "Morning", kitchenId: "K-01" },
  { id: "E-006", name: "Meera Joshi", role: "Waiter", shift: "Night", kitchenId: "K-02" },
];

const roleColors: Record<string, string> = {
  "Head Chef": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Sous Chef": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Line Cook": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Waiter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Cashier: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const emptyForm = { name: "", role: "", shift: "", kitchenId: "" };

const Employees = () => {
  const [items, setItems] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextNum, setNextNum] = useState(7);

  const reset = () => { setForm(emptyForm); setEditId(null); };
  const openAdd = () => { reset(); setOpen(true); };
  const openEdit = (e: Employee) => { setForm({ name: e.name, role: e.role, shift: e.shift, kitchenId: e.kitchenId }); setEditId(e.id); setOpen(true); };
  const handleDelete = (id: string) => { setItems(p => p.filter(i => i.id !== id)); toast({ title: "Employee removed" }); };

  const handleSave = () => {
    if (!form.name || !form.role || !form.shift || !form.kitchenId) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    if (editId) {
      setItems(p => p.map(i => i.id === editId ? { ...i, ...form } : i));
      toast({ title: "Employee updated" });
    } else {
      setItems(p => [...p, { id: `E-${String(nextNum).padStart(3, "0")}`, ...form }]);
      setNextNum(n => n + 1);
      toast({ title: "Employee added" });
    }
    setOpen(false); reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3"><Users className="h-8 w-8 text-primary" /> Employees</h1>
          <p className="text-muted-foreground font-body mt-1">Manage your restaurant staff</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Employee</Button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md overflow-hidden shadow-lg">
        <Table>
          <TableHeader><TableRow className="border-border/50 hover:bg-transparent"><TableHead>E_ID</TableHead><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Shift</TableHead><TableHead>Kitchen ID</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            <AnimatePresence>{items.map(item => (
              <motion.tr key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                <TableCell className="font-mono text-muted-foreground text-sm">{item.id}</TableCell>
                <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                <TableCell><Badge variant="outline" className={roleColors[item.role] || ""}>{item.role}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{item.shift}</TableCell>
                <TableCell className="text-muted-foreground">{item.kitchenId}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </motion.tr>
            ))}</AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
      <Dialog open={open} onOpenChange={v => { if (!v) reset(); setOpen(v); }}>
        <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
          <DialogHeader><DialogTitle className="font-display">{editId ? "Edit Employee" : "Add Employee"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rajesh Kumar" /></div>
            <div className="grid gap-2"><Label>Role</Label><Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Head Chef" /></div>
            <div className="grid gap-2"><Label>Shift</Label><Input value={form.shift} onChange={e => setForm({ ...form, shift: e.target.value })} placeholder="e.g. Morning" /></div>
            <div className="grid gap-2"><Label>Kitchen ID</Label><Input value={form.kitchenId} onChange={e => setForm({ ...form, kitchenId: e.target.value })} placeholder="e.g. K-01" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => { setOpen(false); reset(); }}>Cancel</Button><Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
