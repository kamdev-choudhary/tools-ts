import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Layout />
      </motion.div>
    </Router>
  );
}

export default App;
