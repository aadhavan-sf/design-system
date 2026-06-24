import {
  CaretDown,
  CaretUp,
  DotsThree,
  DotsThreeVertical,
  Flag,
  Heart,
  ListBullets,
  PaperPlaneTilt,
  Plus,
  Question,
  SquaresFour,
} from '@phosphor-icons/react';
import { useState, type ComponentType } from 'react';

import { Text } from '../../foundations/Typography';
import { Button } from '../../molecules/Button';
import { DropdownList } from '../../molecules/DropdownList';
import { Tabs } from '../../molecules/Tabs';
import { TextField } from '../../molecules/TextField';
import { SettingsPanelBetaTag } from '../../organisms/SettingsPanel';
import { Sidebar } from '../../organisms/Sidebar';

import mobilePreviewImage from './assets/mobile-preview.png';
import '../../organisms/SettingsPanel/settingsPanel.css';
import './socialFeed.css';

const SOCIAL_FEED_SECTIONS = [
  {
    title: 'Theme',
    items: [
      { id: 'active-theme', label: 'Active Theme', icon: 'list-star' },
      { id: 'theme-list', label: 'Theme List', icon: 'list-plus' },
    ],
  },
  {
    title: 'App',
    items: [
      { id: 'app-settings', label: 'App Settings', icon: 'gear' },
      { id: 'app-distribution', label: 'App Distribution', icon: 'device' },
      { id: 'social-feed', label: 'Social Feed', icon: 'cards-three' },
    ],
  },
  {
    title: 'Extension',
    items: [
      { id: 'plugins', label: 'Plugins', icon: 'puzzle' },
      { id: 'custom-blocks', label: 'Custom Blocks', icon: 'lego' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { id: 'user-permission', label: 'User Permission', icon: 'user-plus' },
      { id: 'billing', label: 'Billing', icon: 'billing' },
    ],
  },
];

const FILTER_TABS = ['All', 'App Exclusive', 'From Instagram'];

const VIEW_TABS = [
  {
    label: 'List view',
    icon: <ListBullets aria-hidden size={18} weight="regular" />,
    iconOnly: true,
  },
  {
    label: 'Grid view',
    icon: <SquaresFour aria-hidden size={18} weight="regular" />,
    iconOnly: true,
  },
];

const COMMENT_MENU_ITEMS = [
  { label: 'Edit Comment', value: 'edit' },
  { label: 'Delete Comment', value: 'delete', state: 'destructive' },
];

type CommentReply = {
  id: string;
  author: string;
  initials: string;
  avatarTone: string;
  time: string;
  text: string;
};

type CommentItem = {
  id: string;
  author: string;
  initials: string;
  avatarTone: string;
  time: string;
  text: string;
  flaggedCount?: number;
  showMenu?: boolean;
  replies?: CommentReply[];
};

const COMMENTS: CommentItem[] = [
  {
    id: 'chester',
    author: 'Chester Carter',
    initials: 'CC',
    avatarTone: 'brand',
    time: '7h ago',
    text: 'Burger ipsum spicy jalapeno bacon ipsum.',
  },
  {
    id: 'barry-flagged',
    author: 'Barry Considine',
    initials: 'BC',
    avatarTone: 'warning',
    time: '7h ago',
    text: 'Taco ipsum tacos al pastor, suadero. Tacos al pastor, barbacoa. Carne asada, carnitas.',
    flaggedCount: 4,
  },
  {
    id: 'figs',
    author: 'Figs',
    initials: 'F',
    avatarTone: 'success',
    time: '7h ago',
    text: 'Crypto ipsum bitcoin ethereum dogecoin litecoin. Polymath binance PancakeSwap nexo terra.',
    showMenu: true,
  },
  {
    id: 'simon',
    author: 'Simon Wilkinson',
    initials: 'SW',
    avatarTone: 'blue',
    time: '7h ago',
    text: 'Pizza ipsum dolor meat lovers buffalo.',
    replies: [
      {
        id: 'simon-reply',
        author: 'Simon Wilkinson',
        initials: 'SW',
        avatarTone: 'blue',
        time: '7h ago',
        text: 'Crypto ipsum bitcoin ethereum dogecoin litecoin. Polymath binance.',
      },
    ],
  },
  {
    id: 'essie',
    author: 'Essie Doyle',
    initials: 'ED',
    avatarTone: 'rose',
    time: '7h ago',
    text: 'Office ipsum you must be muted.',
  },
  {
    id: 'meredith',
    author: 'Meredith Bode',
    initials: 'MB',
    avatarTone: 'neutral',
    time: '7h ago',
    text: 'Crypto ipsum bitcoin ethereum dogecoin litecoin. Polymath binance PancakeSwap nexo terra.',
  },
  {
    id: 'barry-second',
    author: 'Barry Considine',
    initials: 'BC',
    avatarTone: 'warning',
    time: '7h ago',
    text: 'Office ipsum you must be muted. Site optimal feature ourselves with moments base later.',
  },
];

const TemplateSidebar = Sidebar as unknown as ComponentType<Record<string, unknown>>;

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function getSocialFeedShellClassName() {
  return 'storybook-social-feed box-border h-dvh min-w-[1280px] w-full overflow-hidden bg-neutral-25 font-sans text-neutral-900';
}

function getSocialFeedSidebarClassName() {
  return 'storybook-social-feed__sidebar h-full min-w-0 w-full';
}

function getSocialFeedMainClassName() {
  return 'storybook-social-feed__main box-border flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden';
}

function CommentAvatar({
  initials,
  tone,
}: {
  initials: string;
  tone: string;
}) {
  return (
    <span
      className={buildClassName([
        'storybook-social-feed-comment__avatar',
        `storybook-social-feed-comment__avatar--${tone}`,
      ])}
      aria-hidden="true"
    >
      <Text as="span" variant="text-xs" weight="semibold" color="currentColor">
        {initials}
      </Text>
    </span>
  );
}

function CommentActions() {
  return (
    <div className="storybook-social-feed-comment__actions">
      <button type="button" className="storybook-social-feed-comment__action">
        <Text as="span" variant="text-xs" weight="medium" color="currentColor">
          Reply
        </Text>
      </button>
      <button
        type="button"
        className="storybook-social-feed-comment__action storybook-social-feed-comment__action--icon"
        aria-label="Like comment"
      >
        <Heart size={16} weight="regular" />
      </button>
    </div>
  );
}

function CommentRow({
  comment,
  nested = false,
}: {
  comment: CommentItem | CommentReply;
  nested?: boolean;
}) {
  const flaggedCount = 'flaggedCount' in comment ? comment.flaggedCount : undefined;
  const showMenu = 'showMenu' in comment ? comment.showMenu : false;
  const replies = 'replies' in comment ? comment.replies : undefined;

  return (
    <>
      <article
        className={buildClassName([
          'storybook-social-feed-comment',
          nested && 'storybook-social-feed-comment--nested',
          showMenu && 'storybook-social-feed-comment--menu-open',
        ])}
      >
        <CommentAvatar initials={comment.initials} tone={comment.avatarTone} />

        <div className="storybook-social-feed-comment__content">
          <div className="storybook-social-feed-comment__header">
            <div className="storybook-social-feed-comment__name-row">
              <Text as="span" variant="text-sm" weight="semibold" className="text-neutral-900">
                {comment.author}
              </Text>
              <Text as="span" variant="text-xs" weight="regular" className="text-neutral-500">
                {comment.time}
              </Text>
            </div>

            <div className="storybook-social-feed-comment__header-actions">
              {typeof flaggedCount === 'number' && (
                <span className="storybook-social-feed-comment__flag">
                  <Flag size={14} weight="fill" />
                  <Text as="span" variant="text-xs" weight="semibold" color="currentColor">
                    {flaggedCount}
                  </Text>
                </span>
              )}
              {showMenu ? (
                <button
                  type="button"
                  className="storybook-social-feed-comment__menu-trigger"
                  aria-label="Comment options"
                >
                  <DotsThreeVertical size={16} weight="bold" />
                </button>
              ) : null}
            </div>
          </div>

          <Text as="p" variant="text-sm" weight="regular" className="storybook-social-feed-comment__body">
            {comment.text}
          </Text>

          <CommentActions />

          {showMenu && (
            <div className="storybook-social-feed-comment__menu">
              <DropdownList variant="text" items={COMMENT_MENU_ITEMS} fullWidth />
            </div>
          )}
        </div>
      </article>

      {replies && replies.length > 0 && (
        <>
          <button type="button" className="storybook-social-feed-comment__toggle-replies">
            <Text as="span" variant="text-xs" weight="medium" color="currentColor">
              Hide replies
            </Text>
          </button>
          {replies.map((reply) => (
            <CommentRow key={reply.id} comment={reply} nested />
          ))}
        </>
      )}
    </>
  );
}

export function SocialFeed() {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  return (
    <div className={getSocialFeedShellClassName()}>
      <TemplateSidebar
        activeItemId="social-feed"
        sections={SOCIAL_FEED_SECTIONS}
        className={getSocialFeedSidebarClassName()}
      />

      <main className={getSocialFeedMainClassName()}>
        <div className="storybook-social-feed__feed">
          <header className="storybook-social-feed__feed-header">
            <div className="storybook-social-feed__title-row">
              <Text as="h1" variant="text-md" weight="semibold" className="text-neutral-900">
                Social Feed
              </Text>
              <SettingsPanelBetaTag shine />
              <Button
                hierarchy="link-color"
                size="small"
                label="Help Doc"
                icon="left"
                leadingIcon={<Question aria-hidden size={20} weight="regular" />}
              />
            </div>

            <div className="storybook-social-feed__toolbar">
              <Tabs
                type="segments"
                tabs={FILTER_TABS}
                activeIndex={activeFilterIndex}
                onTabChange={setActiveFilterIndex}
                showIcons={false}
                size="md"
              />

              <div className="storybook-social-feed__toolbar-actions">
                <Tabs
                  type="segments"
                  tabs={VIEW_TABS}
                  activeIndex={activeViewIndex}
                  onTabChange={setActiveViewIndex}
                  showIcons={false}
                  size="md"
                />

                <Button
                  hierarchy="primary"
                  size="medium"
                  label="Add new"
                  icon="both"
                  leadingIcon={<Plus aria-hidden size={20} weight="regular" />}
                  trailingIcon={<CaretDown aria-hidden size={16} weight="bold" />}
                  className="storybook-social-feed__add-new"
                />
              </div>
            </div>
          </header>

          <div className="storybook-social-feed__grid">
            <div className="storybook-social-feed__scroll-nav" aria-label="Preview navigation">
              <button
                type="button"
                className="storybook-social-feed__preview-nav"
                aria-label="Previous post"
              >
                <CaretUp size={16} weight="bold" />
              </button>
              <button
                type="button"
                className="storybook-social-feed__preview-nav"
                aria-label="Next post"
              >
                <CaretDown size={16} weight="bold" />
              </button>
            </div>

            <section className="storybook-social-feed__mock" aria-label="Feed preview">
              <div className="storybook-social-feed__mock-stage">
                <img
                  className="storybook-social-feed__phone"
                  src={mobilePreviewImage}
                  alt="Social feed mobile preview"
                />
                <Text
                  as="span"
                  variant="text-sm"
                  weight="medium"
                  className="storybook-social-feed__preview-label"
                >
                  PREVIEW
                </Text>
              </div>
            </section>

            <aside className="storybook-social-feed__comments-panel" aria-label="Comments">
              <div className="storybook-social-feed__comments-body">
                <div className="storybook-social-feed__comments-header">
                  <Text as="h2" variant="text-md" weight="semibold" className="text-neutral-900">
                    Comments
                  </Text>
                  <button
                    type="button"
                    className="storybook-social-feed__comments-menu"
                    aria-label="Comments options"
                  >
                    <DotsThree size={20} weight="bold" />
                  </button>
                </div>

                <div className="storybook-social-feed__comments-list">
                  {COMMENTS.map((comment) => (
                    <CommentRow key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>

              <div className="storybook-social-feed__comment-composer">
                <TextField
                  type="input"
                  fluid
                  label={false}
                  placeholder="Add a comment"
                  tooltip={false}
                  astriks={false}
                />
                <button
                  type="button"
                  className="storybook-social-feed__comment-send"
                  aria-label="Send comment"
                >
                  <PaperPlaneTilt size={18} weight="fill" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
