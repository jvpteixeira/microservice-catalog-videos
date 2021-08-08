import { httpVideo } from ".";
import HttpResource from "./http-resource";

const genre = new HttpResource(httpVideo, "genres");

export default genre;