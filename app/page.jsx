/**
 * Internal dependencies.
 */
import Container from "@/components/Container";
import AppDataProvider from "@providers/AppDataProvider";

const App = () => {
  return (
    <AppDataProvider>
      <Container />
    </AppDataProvider>
  );
};

export default App;
