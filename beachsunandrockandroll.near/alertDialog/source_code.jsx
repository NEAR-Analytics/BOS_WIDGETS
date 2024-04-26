const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const AlertDialogRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Root className={className} {...props}>
      {children}
    </AlertDialog.Root>
  </Tailwind>
);

const AlertDialogTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Trigger className={className} {...props}>
      {children}
    </AlertDialog.Trigger>
  </Tailwind>
);

const AlertDialogOverlay = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Overlay className={className} {...props} ref="forwardedRef">
      {children}
    </AlertDialog.Overlay>
  </Tailwind>
);

const AlertDialogContent = ({
  className,
  classNameOverlay,
  children,
  ...props
}) => (
  <Tailwind>
    <AlertDialogOverlay className={classNameOverlay} />
    <AlertDialog.Content ref="forwardedRef" className={className} {...props}>
      {children}
    </AlertDialog.Content>
  </Tailwind>
);

const AlertDialogHeader = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const AlertDialogFooter = ({ className, children, ...props }) => (
  <Tailwind>
    <div className={className} {...props}>
      {children}
    </div>
  </Tailwind>
);

const AlertDialogTitle = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Title ref="forwardedRef" className={className} {...props}>
      {children}
    </AlertDialog.Title>
  </Tailwind>
);

const AlertDialogDescription = ({ className, children, ...props }) => (
  <Tailwind>
    <AlertDialog.Description
      ref="forwardedRef"
      className={className}
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
  AlertDialogRoot,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
