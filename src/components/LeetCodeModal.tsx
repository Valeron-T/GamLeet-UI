import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateLeetCodeCredentials } from "@/api/dashboard";
import { IconBrandLeetcode, IconExternalLink, IconInfoCircle } from "@tabler/icons-react";

interface LeetCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    currentUsername?: string;
}

export function LeetCodeModal({ isOpen, onClose, onSuccess, currentUsername }: LeetCodeModalProps) {
    const [username, setUsername] = useState(currentUsername || "");
    const [session, setSession] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !session) {
            toast.error("Please fill in both fields");
            return;
        }

        setIsLoading(true);
        try {
            await updateLeetCodeCredentials(username, session);
            toast.success("LeetCode account linked successfully!");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to link LeetCode account");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md sm:max-w-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <IconBrandLeetcode size={24} />
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tight">Link LeetCode Account</DialogTitle>
                    </div>
                    <DialogDescription className="font-medium">
                        Sync your daily solved problems and streak data automatically.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                            <IconInfoCircle size={14} />
                            How to get LEETCODE_SESSION
                        </div>
                        <ol className="text-xs space-y-2 text-muted-foreground font-medium list-decimal list-inside">
                            <li>Log in to <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">leetcode.com <IconExternalLink size={10} /></a></li>
                            <li>Right-click anywhere and select <span className="text-foreground font-bold">Inspect</span> (or press F12)</li>
                            <li>Go to the <span className="text-foreground font-bold">Application</span> tab (or <span className="text-foreground font-bold">Storage</span> on Firefox)</li>
                            <li>Select <span className="text-foreground font-bold">Cookies</span> → <span className="text-foreground font-bold">https://leetcode.com</span></li>
                            <li>Find the name <span className="text-foreground font-bold italic">LEETCODE_SESSION</span> and copy its value</li>
                        </ol>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="font-bold text-xs uppercase tracking-widest ml-1">Username</Label>
                            <Input
                                id="username"
                                placeholder="valerontoscano"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="rounded-xl border-border/50 bg-background/50 h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="session" className="font-bold text-xs uppercase tracking-widest ml-1">Session Cookie</Label>
                            <Input
                                id="session"
                                type="password"
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                                value={session}
                                onChange={(e) => setSession(e.target.value)}
                                className="rounded-xl border-border/50 bg-background/50 h-10"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-xl font-black uppercase tracking-widest text-xs h-12"
                            disabled={isLoading}
                        >
                            {isLoading ? "Syncing..." : "Connect LeetCode"}
                        </Button>
                    </form>
                </div>

                <DialogFooter className="sm:justify-start">
                    <p className="text-[10px] text-muted-foreground font-medium text-center w-full">
                        Your session cookie is stored securely and used only for sync.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
