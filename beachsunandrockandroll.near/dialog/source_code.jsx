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

const dialogOverlayClassname =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const DialogOverlay = ({ className, ...props }) => (
  <Tailwind>
    <Dialog.Overlay
      ref="forwardedRef"
      className={className ?? dialogOverlayClassname}
      {...props}
    />
  </Tailwind>
);

const dialogContentClassname =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg";

const DialogContent = ({ className, children, ...props }) => (
  <Tailwind>
    <DialogOverlay />
    <Dialog.Content
      ref="forwardedRef"
      className={className ?? dialogContentClassname}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <i class="bi bi-x h-4 w-4"></i>
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </Tailwind>
);

const dialogHeaderClassname =
  "flex flex-col space-y-1.5 text-center sm:text-left";

const DialogHeader = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className ?? dialogHeaderClassname} {...props}>
      {children}
    </div>
  </Tailwind>
);

const dialogFooterClassname =
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

const DialogFooter = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className ?? dialogFooterClassname} {...props}>
      {children}
    </div>
  </Tailwind>
);

const dialogTitleClassname =
  "text-lg font-semibold leading-none tracking-tight";

const DialogTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Title
      ref="forwardedRef"
      className={className ?? dialogTitleClassname}
      {...props}
    >
      {children}
    </Dialog.Title>
  </Tailwind>
);

const dialogDescriptionClassname = "text-sm text-muted-foreground";

const DialogDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <Dialog.Description
      ref="forwardedRef"
      className={className ?? dialogDescriptionClassname}
      {...props}
    >
      {children}
    </Dialog.Description>
  </Tailwind>
);

return {
  Dialog: DialogRoot,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogOverlayClassname,
  dialogContentClassname,
  dialogHeaderClassname,
  dialogFooterClassname,
  dialogTitleClassname,
  dialogDescriptionClassname,
};
