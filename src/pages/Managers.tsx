import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Manager { id: string; name: string; }

const initialData: Manager[] = [
  { id: "M-001", name: "Arjun Mehta" },
  { id: "M-002", name: "Nisha Gupta" },
  { id: "M-003", name: "Rohan Desai" },
];

const emptyForm = { name: "" };

const Managers = () => {
  const [items, setItems] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextNum, setNextNum] = useState(4);

  const reset = () => { setForm(emptyForm); setEditId(null); };
  const openAdd = () => { reset(); setOpen(true); };
  const openEdit = (m: Manager) => { setForm({ name: m.name }); setEditId(m.id); setOpen(true); };
  const handleDelete = (id: string) => { setItems(p => p.filter(i => i.id !== id)); toast({ title: "Manager removed" }); };

  const handleSave = () => {
    if (!form.name) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    if (editId) {
      setItems(p => p.map(i => i.id === editId ? { ...i, ...form } : i));
      toast({ title: "Manager updated" });
    } else {
      setItems(p => [...p, { id: `M-${String(nextNum).padStart(3, "0")}`, ...form }]);
      setNextNum(n => n + 1);
      toast({ title: "Manager added" });
    }
    setOpen(false); reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3"><Crown className="h-8 w-8 text-primary" /> Managers</h1>
          <p className="text-muted-foreground font-body mt-1">Manage restaurant managers</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Manager</Button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md overflow-hidden shadow-lg">
        <Table>
          <TableHeader><TableRow className="border-border/50 hover:bg-transparent"><TableHead>Manager ID</TableHead><TableHead>Name</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            <AnimatePresence>{items.map(item => (
              <motion.tr key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                <TableCell className="font-mono text-muted-foreground text-sm">{item.id}</TableCell>
                <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
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
          <DialogHeader><DialogTitle className="font-display">{editId ? "Edit Manager" : "Add Manager"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Arjun Mehta" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => { setOpen(false); reset(); }}>Cancel</Button><Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Managers;
