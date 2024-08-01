"use client";

import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Dialog open>
        <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" />
        <InterceptedDialogContent>{children}</InterceptedDialogContent>
      </Dialog>
    </div>
  );
}
