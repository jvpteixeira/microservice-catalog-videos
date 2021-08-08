import { httpVideo } from ".";
import HttpResource from "./http-resource";

const castMember = new HttpResource(httpVideo, "castMembers");

export default castMember;