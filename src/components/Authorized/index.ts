import Authorized from './Authorized';
import { check } from './checkPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.check = check;

const AuthorizeRenderer = renderAuthorize(Authorized);

export default AuthorizeRenderer;
