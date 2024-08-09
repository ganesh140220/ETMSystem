import { configureStore } from "@reduxjs/toolkit";
import obj from "./slicefile";

export default configureStore({
    reducer:{myobj:obj}
})