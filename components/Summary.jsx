/**
 * External dependencies.
 */
import Markdown from 'markdown-to-jsx';

/**
 * Internal dependencies.
 */
import useApp from '@hooks/useApp';
import { NothingFoundCard } from '@components';

const Summary = () => {
  const { profileSummary } = useApp();

  return (
    <div className="h-full">
      <div id="profile-container" className="text-gray-800 overflow-auto max-h-[420px]">
        {profileSummary === "" ? (
          <NothingFoundCard />
        ): (
          <Markdown id="profile-summary" className="text-sm border rounded-md py-2 px-4">
              {profileSummary}
          </Markdown>
        )}
      </div>
    </div>
  );
}

export default Summary;