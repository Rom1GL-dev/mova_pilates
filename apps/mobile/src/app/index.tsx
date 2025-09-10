import "../../global.css";
import AppProvider from "./provider";
import AppRouter from "./router";

export default function Index() {
  return (
    <AppProvider>
        <AppRouter />
    </AppProvider>
  );
}
