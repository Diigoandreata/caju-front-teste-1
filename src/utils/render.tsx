import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const render = (children: React.ReactNode) => {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
          limit={1}
        />
        {children}
      </HashRouter>
    </QueryClientProvider>
  );
};
