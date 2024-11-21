/**
 * External dependencies.
 */
import Markdown from 'markdown-to-jsx';

/**
 * internal dependencies.
 */
import { NothingFoundCard } from '@components';

const Summary = ({ profileSummary }) => {
  return (
    <div id="profile-container" className="overflow-auto max-h-[490px]">
      <div className="h-full text-gray-800">
        {profileSummary === "" ? (
          <NothingFoundCard />
        ): (
          <Markdown id="profile-summary" className="text-sm">
              {profileSummary}
          </Markdown>
        )}
      </div>
    </div>
  );
}

export default Summary;