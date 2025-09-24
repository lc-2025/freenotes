import FormAuthentication from '@/components/Authentication/FormAuthentication';

/**
 * @description Authentication page
 * @author Luca Cattide
 * @date 15/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Authentication(): React.ReactNode {
  // TODO: Redirects here if not logged in (routes protection)
  return <FormAuthentication />;
}
