import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevPathRef = useRef(location.pathname + location.search);

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    const isNewPageNavigation =
        navigationType === "PUSH" || navigationType === "REPLACE";

    if (isNewPageNavigation && prevPathRef.current !== currentPath) {
      window.scrollTo(0, 0);
    }

    prevPathRef.current = currentPath;
  }, [location, navigationType]);

  return null;
}

export default ScrollToTop;