import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import NotFoundPage from "./pages/NotFound";
import Loader from "./components/Loader"; // Assume you have a Loader component

const Home = React.lazy(() => import("./pages/home/Home"));
const Clock = React.lazy(() => import("./pages/utilities/clock/Clock"));
const Password = React.lazy(
  () => import("./pages/utilities/password/PasswordGenerator")
);
const ColorPicker = React.lazy(
  () => import("./pages/utilities/color/ColorPicker")
);
const Crypto = React.lazy(() => import("./pages/cryptojs/CryptoJS"));
const QRCodeGenerator = React.lazy(
  () => import("./pages/utilities/qr/QRCodeGenerator")
);
const Dictionary = React.lazy(
  () => import("./pages/utilities/dictionary/Dictionary")
);
const Jokes = React.lazy(() => import("./pages/entertainments/Jokes"));
const Sayari = React.lazy(() => import("./pages/entertainments/Sayari"));
const Movies = React.lazy(() => import("./pages/entertainments/Movies"));
const ImageCompressor = React.lazy(
  () => import("./pages/image/ImageCompressor")
);
const ImageConverter = React.lazy(() => import("./pages/image/ImageConverter"));
const PdfCompressor = React.lazy(() => import("./pages/pdfs/CompressPdf"));
const Exceltojson = React.lazy(() => import("./pages/developers/ExcelToJson"));
const Jsontoexcel = React.lazy(() => import("./pages/developers/JsonToExcel"));
const FreeApi = React.lazy(() => import("./pages/developers/FreeApi"));
const JEEMainRankCalculator = React.lazy(
  () => import("./pages/education/JEEMainRankCalculator")
);
const JEEMainClosingRank = React.lazy(
  () => import("./pages/education/JEEMainClosingRank")
);
const JEEAdvORCR = React.lazy(() => import("./pages/education/JEEAdvORCR"));
const PDFGenerator = React.lazy(() => import("./pages/pdfs/PDFGenerator"));
const FileMerger = React.lazy(() => import("./pages/file/FileMerger"));
const FileReader = React.lazy(() => import("./pages/file/FileReader"));

const RoutesComponent: React.FC = () => {
  const location = useLocation(); // To track the current location
  return (
    <motion.div
      key={location.key} // Ensures proper animation on route change
      initial={{ opacity: 0 }} // Initial state (before animation starts)
      animate={{ opacity: 1 }} // Final state (after animation completes)
      exit={{ opacity: 0 }} // Exit animation (when leaving the route)
      transition={{ duration: 0.5 }} // Duration of the transition
    >
      <Suspense fallback={<Loader open={true} />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/password-generator" element={<Password />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/jokes" element={<Jokes />} />
          <Route path="/sayari" element={<Sayari />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/image/compressor" element={<ImageCompressor />} />
          <Route path="/image/converter" element={<ImageConverter />} />
          <Route path="/pdf/compressor" element={<PdfCompressor />} />
          <Route path="/pdf/generator" element={<PDFGenerator />} />
          <Route path="/dev/excel-to-json" element={<Exceltojson />} />
          <Route path="/dev/json-to-excel" element={<Jsontoexcel />} />
          <Route path="/dev/free-api" element={<FreeApi />} />
          <Route
            path="/edu/jeemain/rank-prediction"
            element={<JEEMainRankCalculator />}
          />
          <Route
            path="/edu/jeemain/closing-rank"
            element={<JEEMainClosingRank />}
          />
          <Route path="/edu/jeeadv/closing-rank" element={<JEEAdvORCR />} />
          <Route path="/file/file-merger" element={<FileMerger />} />
          <Route path="/file/reader" element={<FileReader />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
};

export default RoutesComponent;
