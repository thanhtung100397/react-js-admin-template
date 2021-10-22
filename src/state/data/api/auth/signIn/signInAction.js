import { createApiActions } from '../../../../_base/api/apiAction';

const STORE_PATH = 'data.api.auth.signIn';

export const SignInAction = createApiActions(STORE_PATH);