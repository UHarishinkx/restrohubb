import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Client { id: string; name: string; contact: string; }

const initialData: Client[] = [
  { id: "C-001", name: "Alice Johnson", contact: "9876543210" },
  { id: "C-002", name: "Bob Chen", contact: "9123456789" },
  { id: "C-003", name: "Clara Davis", contact: "9988776655" },
  { id: "C-004", name: "David Kim", contact: "9012345678" },
  { id: "C-005", name: "Emma Wilson", contact: "9871234567" },
];

const emptyForm = { name: "", contact: "" };

const Clients = () => {
  const [items, setItems] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextNum, setNextNum] = useState(6);

  const reset = () => { setForm(emptyForm); setEditId(null); };
  const openAdd = () => { reset(); setOpen(true); };
  const openEdit = (c: Client) => { setForm({ name: c.name, contact: c.contact }); setEditId(c.id); setOpen(true); };
  const handleDelete = (id: string) => { setItems(p => p.filter(i => i.id !== id)); toast({ title: "Client removed" }); };

  const handleSave = () => {
    if (!form.name || !form.contact) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    if (editId) {
      setItems(p => p.map(i => i.id === editId ? { ...i, ...form } : i));
      toast({ title: "Client updated" });
    } else {
      setItems(p => [...p, { id: `C-${String(nextNum).padStart(3, "0")}`, ...form }]);
      setNextNum(n => n + 1);
      toast({ title: "Client added" });
    }
    setOpen(false); reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3"><UserCheck className="h-8 w-8 text-primary" /> Clients</h1>
          <p className="text-muted-foreground font-body mt-1">Manage your restaurant clients</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Client</Button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md overflow-hidden shadow-lg">
        <Table>
          <TableHeader><TableRow className="border-border/50 hover:bg-transparent"><TableHead>C_ID</TableHead><TableHead>Name</TableHead><TableHead>Contact</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            <AnimatePresence>{items.map(item => (
              <motion.tr key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} className="border-b border-border/30 transition-colors hover:bg-muted/50">
                <TableCell className="font-mono text-muted-foreground text-sm">{item.id}</TableCell>
                <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.contact}</TableCell>
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
          <DialogHeader><DialogTitle className="font-display">{editId ? "Edit Client" : "Add Client"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Alice Johnson" /></div>
            <div className="grid gap-2"><Label>Contact</Label><Input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="e.g. 9876543210" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => { setOpen(false); reset(); }}>Cancel</Button><Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
