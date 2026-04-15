import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ClipboardList, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Order { id: string; clientId: string; items: string; total: number; rating: number; feedback: string; }

const clients = [
  { id: "C-001", name: "Alice Johnson" },
  { id: "C-002", name: "Bob Chen" },
  { id: "C-003", name: "Clara Davis" },
  { id: "C-004", name: "David Kim" },
  { id: "C-005", name: "Emma Wilson" },
];

const menuItems = ["Veg Meals", "Chicken Biryani", "Veg Biryani", "Classic Burger", "Cheese Burger", "Paneer Tikka", "Chicken Wings", "Gulab Jamun"];

const initialData: Order[] = [
  { id: "O-001", clientId: "C-001", items: "Veg Meals, Paneer Tikka", total: 320, rating: 5, feedback: "Excellent food!" },
  { id: "O-002", clientId: "C-002", items: "Chicken Biryani, Chicken Wings", total: 470, rating: 4, feedback: "Great taste" },
  { id: "O-003", clientId: "C-003", items: "Classic Burger", total: 150, rating: 3, feedback: "Average" },
  { id: "O-004", clientId: "C-004", items: "Cheese Burger, Gulab Jamun", total: 260, rating: 5, feedback: "Loved it!" },
  { id: "O-005", clientId: "C-005", items: "Veg Biryani", total: 180, rating: 4, feedback: "Good portion size" },
];

const emptyForm = { clientId: "", selectedItems: [] as string[], total: "", rating: "", feedback: "" };

const Orders = () => {
  const [items, setItems] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [nextNum, setNextNum] = useState(6);

  const reset = () => setForm(emptyForm);
  const handleDelete = (id: string) => { setItems(p => p.filter(i => i.id !== id)); toast({ title: "Order removed" }); };

  const toggleItem = (item: string) => {
    setForm(f => ({ ...f, selectedItems: f.selectedItems.includes(item) ? f.selectedItems.filter(i => i !== item) : [...f.selectedItems, item] }));
  };

  const handleSave = () => {
    if (!form.clientId || form.selectedItems.length === 0 || !form.total) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    const id = `O-${String(nextNum).padStart(3, "0")}`;
    setNextNum(n => n + 1);
    setItems(p => [...p, { id, clientId: form.clientId, items: form.selectedItems.join(", "), total: Number(form.total), rating: Number(form.rating) || 0, feedback: form.feedback }]);
    toast({ title: "Order added" });
    setOpen(false); reset();
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />)}</div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3"><ClipboardList className="h-8 w-8 text-primary" /> Orders</h1>
          <p className="text-muted-foreground font-body mt-1">Track and manage restaurant orders</p>
        </div>
        <Button onClick={() => { reset(); setOpen(true); }} className="gap-2"><Plus className="h-4 w-4" /> Add Order</Button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md overflow-hidden shadow-lg">
        <Table>
          <TableHeader><TableRow className="border-border/50 hover:bg-transparent"><TableHead>O_ID</TableHead><TableHead>Client</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Rating</TableHead><TableHead>Feedback</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            <AnimatePresence>{items.map(item => (
              <motion.tr key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                <TableCell className="font-mono text-muted-foreground text-sm">{item.id}</TableCell>
                <TableCell className="font-semibold text-foreground">{clients.find(c => c.id === item.clientId)?.name || item.clientId}</TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate">{item.items}</TableCell>
                <TableCell className="font-semibold text-primary">₹{item.total.toFixed(2)}</TableCell>
                <TableCell>{renderStars(item.rating)}</TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[150px] truncate">{item.feedback}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </motion.tr>
            ))}</AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
      <Dialog open={open} onOpenChange={v => { if (!v) reset(); setOpen(v); }}>
        <DialogContent className="sm:max-w-lg bg-card border-border/50 backdrop-blur-xl">
          <DialogHeader><DialogTitle className="font-display">Add New Order</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Client</Label>
              <Select value={form.clientId} onValueChange={v => setForm({ ...form, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Items</Label>
              <div className="flex flex-wrap gap-2">{menuItems.map(mi => (
                <Badge key={mi} variant={form.selectedItems.includes(mi) ? "default" : "outline"} className="cursor-pointer transition-all" onClick={() => toggleItem(mi)}>{mi}</Badge>
              ))}</div>
            </div>
            <div className="grid gap-2"><Label>Total (₹)</Label><Input type="number" value={form.total} onChange={e => setForm({ ...form, total: e.target.value })} placeholder="e.g. 320" /></div>
            <div className="grid gap-2"><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} placeholder="e.g. 5" /></div>
            <div className="grid gap-2"><Label>Feedback</Label><Input value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} placeholder="e.g. Great food!" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => { setOpen(false); reset(); }}>Cancel</Button><Button onClick={handleSave}>Add Order</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
