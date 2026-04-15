import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  kitchenId: string;
}

const initialItems: MenuItem[] = [
  { id: "ITEM-001", name: "Veg Meals", category: "Main Course", price: 120, kitchenId: "K-01" },
  { id: "ITEM-002", name: "Chicken Biryani", category: "Biryani", price: 220, kitchenId: "K-02" },
  { id: "ITEM-003", name: "Veg Biryani", category: "Biryani", price: 180, kitchenId: "K-02" },
  { id: "ITEM-004", name: "Classic Burger", category: "Burger", price: 150, kitchenId: "K-03" },
  { id: "ITEM-005", name: "Cheese Burger", category: "Burger", price: 180, kitchenId: "K-03" },
  { id: "ITEM-006", name: "Paneer Tikka", category: "Starters", price: 200, kitchenId: "K-01" },
  { id: "ITEM-007", name: "Chicken Wings", category: "Starters", price: 250, kitchenId: "K-02" },
  { id: "ITEM-008", name: "Gulab Jamun", category: "Desserts", price: 80, kitchenId: "K-01" },
];

const emptyForm = { name: "", category: "", price: "", kitchenId: "" };

const categoryColors: Record<string, string> = {
  "Main Course": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Biryani: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Burger: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Starters: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Desserts: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

const MenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextNum, setNextNum] = useState(9);

  const resetForm = () => { setForm(emptyForm); setEditId(null); };

  const openAdd = () => { resetForm(); setOpen(true); };

  const openEdit = (item: MenuItem) => {
    setForm({ name: item.name, category: item.category, price: String(item.price), kitchenId: item.kitchenId });
    setEditId(item.id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Item deleted", description: `Removed ${id} from the menu.` });
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.price || !form.kitchenId) {
      toast({ title: "Missing fields", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    if (editId) {
      setItems((prev) => prev.map((i) => i.id === editId ? { ...i, name: form.name, category: form.category, price: Number(form.price), kitchenId: form.kitchenId } : i));
      toast({ title: "Item updated", description: `${form.name} has been updated.` });
    } else {
      const id = `ITEM-${String(nextNum).padStart(3, "0")}`;
      setNextNum((n) => n + 1);
      setItems((prev) => [...prev, { id, name: form.name, category: form.category, price: Number(form.price), kitchenId: form.kitchenId }]);
      toast({ title: "Item added", description: `${form.name} has been added to the menu.` });
    }
    setOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <UtensilsCrossed className="h-8 w-8 text-primary" /> Menu Items
          </h1>
          <p className="text-muted-foreground font-body mt-1">Manage your restaurant menu</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md overflow-hidden shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Item ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Kitchen ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-border/30 transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-mono text-muted-foreground text-sm">{item.id}</TableCell>
                  <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={categoryColors[item.category] || ""}>{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">₹{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">{item.kitchenId}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
        <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-display">{editId ? "Edit Item" : "Add New Item"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Item Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chicken Biryani" />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Biryani" />
            </div>
            <div className="grid gap-2">
              <Label>Price (₹)</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 220" />
            </div>
            <div className="grid gap-2">
              <Label>Kitchen ID</Label>
              <Input value={form.kitchenId} onChange={(e) => setForm({ ...form, kitchenId: e.target.value })} placeholder="e.g. K-01" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSave}>{editId ? "Update" : "Add Item"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItems;
