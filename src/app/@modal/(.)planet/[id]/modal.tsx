"use client";

import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog open>
      <InterceptedDialogContent>{children}</InterceptedDialogContent>
    </Dialog>
  );
}
