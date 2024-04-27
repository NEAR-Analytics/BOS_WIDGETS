const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AlertDialogRoot = ({ children, ...props }) => (
  <Tailwind>
    <AlertDialog.Root {...props}>{children}</AlertDialog.Root>
  </Tailwind>
);

const AlertDialogTrigger = ({ children, ...props }) => (
  <Tailwind>
    <AlertDialog.Trigger {...props}>{children}</AlertDialog.Trigger>
  </Tailwind>
);

const alertDialogOverlayClassname =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const AlertDialogOverlay = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Overlay
      className={className ?? alertDialogOverlayClassname}
      {...props}
      ref="forwardedRef"
    >
      {children}
    </AlertDialog.Overlay>
  </Tailwind>
);
const alertDialogContentClassname =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg";

const AlertDialogContent = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialogOverlay />
    <AlertDialog.Content
      ref="forwardedRef"
      className={className ?? alertDialogContentClassname}
      {...props}
    >
      {children}
    </AlertDialog.Content>
  </Tailwind>
);

const alertDialogHeaderClassname =
  "flex flex-col space-y-2 text-center sm:text-left";

const AlertDialogHeader = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className ?? alertDialogHeaderClassname} {...props}>
      {children}
    </div>
  </Tailwind>
);

const alertDialogFooterClassname =
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

const AlertDialogFooter = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className ?? alertDialogFooterClassname} {...props}>
      {children}
    </div>
  </Tailwind>
);

const alertDialogTitleClassname = "text-lg font-semibold";

const AlertDialogTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Title
      ref="forwardedRef"
      className={className ?? alertDialogTitleClassname}
      {...props}
    >
      {children}
    </AlertDialog.Title>
  </Tailwind>
);

const alertDialogDescriptionClassname = "text-sm text-muted-foreground";

const AlertDialogDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Description
      ref="forwardedRef"
      className={className ?? alertDialogDescriptionClassname}
      {...props}
    >
      {children}
    </AlertDialog.Description>
  </Tailwind>
);

const AlertDialogAction = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Action ref="forwardedRef" className={className} {...props}>
      {children}
    </AlertDialog.Action>
  </Tailwind>
);

const AlertDialogCancel = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Cancel ref="forwardedRef" className={className} {...props}>
      {children}
    </AlertDialog.Cancel>
  </Tailwind>
);

return {
  AlertDialog: AlertDialogRoot,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogOverlayClassname,
  alertDialogContentClassname,
  alertDialogHeaderClassname,
  alertDialogFooterClassname,
  alertDialogTitleClassname,
  alertDialogDescriptionClassname,
};
