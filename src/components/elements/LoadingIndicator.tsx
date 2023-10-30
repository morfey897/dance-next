import clsx from "clsx";

const LoadingIndicator = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="status" {...props}>
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="relative !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
    </div>
  </div>
);

export default LoadingIndicator;