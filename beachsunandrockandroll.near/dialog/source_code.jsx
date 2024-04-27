const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const DialogRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Root className={className} {...props}>
      {children}
    </Dialog.Root>
  </Tailwind>
);

const DialogTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Trigger className={className} {...props}>
      {children}
    </Dialog.Trigger>
  </Tailwind>
);

const DialogClose = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Close className={className} {...props}>
      {children}
    </Dialog.Close>
  </Tailwind>
);

const DialogOverlay = ({ className, ...props }) => (
  <Tailwind>
    <Dialog.Overlay ref="forwardedRef" className={className} {...props} />
  </Tailwind>
);

const DialogContent = ({ className, children, ...props }) => (
  <Tailwind>
    <DialogOverlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <Dialog.Content ref="forwardedRef" className={className} {...props}>
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <i class="bi bi-x h-4 w-4"></i>
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </Tailwind>
);

const DialogHeader = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const DialogFooter = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const DialogTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Title ref="forwardedRef" className={className} {...props}>
      {children}
    </Dialog.Title>
  </Tailwind>
);

const DialogDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Description ref="forwardedRef" className={className} {...props}>
      {children}
    </Dialog.Description>
  </Tailwind>
);

return {
  DialogRoot,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
