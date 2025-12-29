import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateZerodhaCredentials } from "@/api/dashboard";
import { IconExternalLink, IconInfoCircle, IconCurrencyRupee } from "@tabler/icons-react";

interface ZerodhaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function ZerodhaModal({ isOpen, onClose, onSuccess }: ZerodhaModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey || !apiSecret) {
            toast.error("Please fill in both fields");
            return;
        }

        setIsLoading(true);
        try {
            await updateZerodhaCredentials(apiKey, apiSecret);
            toast.success("Zerodha credentials saved! You can now log in.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to save credentials");
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
                        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                            <IconCurrencyRupee size={24} />
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tight">Zerodha API Configuration</DialogTitle>
                    </div>
                    <DialogDescription className="font-medium">
                        Enter your Zerodha Kite Connect credentials to enable penalty execution.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
                            <IconInfoCircle size={14} />
                            Getting your credentials
                        </div>
                        <ol className="text-xs space-y-2 text-muted-foreground font-medium list-decimal list-inside">
                            <li>Go to <a href="https://kite.trade" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline inline-flex items-center gap-0.5">kite.trade <IconExternalLink size={10} /></a> and log in.</li>
                            <li>Create a new app (or use an existing one).</li>
                            <li>Copy the <span className="text-foreground font-bold">API Key</span> and <span className="text-foreground font-bold font-mono">API Secret</span>.</li>
                        </ol>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="apiKey" className="font-bold text-xs uppercase tracking-widest ml-1">API Key</Label>
                            <Input
                                id="apiKey"
                                placeholder="Your Kite API Key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="rounded-xl border-border/50 bg-background/50 h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apiSecret" className="font-bold text-xs uppercase tracking-widest ml-1">API Secret</Label>
                            <Input
                                id="apiSecret"
                                type="password"
                                placeholder="Your Kite API Secret"
                                value={apiSecret}
                                onChange={(e) => setApiSecret(e.target.value)}
                                className="rounded-xl border-border/50 bg-background/50 h-10"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-xl font-black uppercase tracking-widest text-xs h-12 bg-sky-600 hover:bg-sky-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Credentials"}
                        </Button>
                    </form>
                </div>

                <DialogFooter className="sm:justify-start">
                    <p className="text-[10px] text-muted-foreground font-medium text-center w-full">
                        Credentials are encrypted before being stored. Ensure your Redirect URL is set correctly in Kite console.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
