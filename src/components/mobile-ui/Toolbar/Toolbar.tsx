import type { ReactNode } from 'react';
import {
  Bell,
  CaretLeft,
  Heart,
  List,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from '@phosphor-icons/react';

import { Text } from '../../foundations/Typography';
import superfansLogoWhite from '../../../assets/superfans-logo-white.png';
import superfansMark from '../../../assets/superfans-mark.png';

export type ToolbarVariant = 'homepage1' | 'homepage2';

export type ToolbarLeftAction = 'back' | 'notifications' | 'menu' | 'none';

export type ToolbarCenterContent = 'label' | 'mark' | 'logo';

export type ToolbarRightAction =
  | 'search'
  | 'notifications'
  | 'notifications-badge'
  | 'wishlist'
  | 'cart'
  | 'cart-badge'
  | 'account'
  | 'none';

export type ToolbarRightIconSlot = Exclude<ToolbarRightAction, 'none'>;

export const TOOLBAR_RIGHT_ICON_SLOT_OPTIONS: ToolbarRightIconSlot[] = [
  'search',
  'notifications',
  'notifications-badge',
  'wishlist',
  'cart',
  'cart-badge',
  'account',
];

export interface ToolbarProps {
  /** Figma homepage preset; overrides slot props when set. */
  variant?: ToolbarVariant;
  leftAction?: ToolbarLeftAction;
  centerContent?: ToolbarCenterContent;
  centerLabel?: string;
  /** First right icon slot from Figma (2177:2946). */
  rightIconSlot1?: ToolbarRightIconSlot;
  /** Second right icon slot from Figma (2177:2946). Cannot match slot 1. */
  rightIconSlot2?: ToolbarRightIconSlot;
  /** @deprecated Prefer rightIconSlot1 and rightIconSlot2. */
  rightActions?: ToolbarRightAction[];
  badgeCount?: number;
  className?: string;
  onBack?: () => void;
  onMenu?: () => void;
  onSearch?: () => void;
  onNotifications?: () => void;
  onWishlist?: () => void;
  onCart?: () => void;
  onAccount?: () => void;
}

type ResolvedToolbar = {
  leftAction: ToolbarLeftAction;
  centerContent: ToolbarCenterContent;
  centerLabel: string;
  logoPlacement: 'left' | 'center';
  rightActions: ToolbarRightAction[];
  badgeCount: number;
};

const VARIANT_PRESETS: Record<
  ToolbarVariant,
  Omit<ResolvedToolbar, 'centerLabel'>
> = {
  homepage1: {
    leftAction: 'back',
    centerContent: 'logo',
    logoPlacement: 'center',
    rightActions: ['search', 'cart-badge'],
    badgeCount: 10,
  },
  homepage2: {
    leftAction: 'none',
    centerContent: 'logo',
    logoPlacement: 'left',
    rightActions: ['search', 'cart-badge'],
    badgeCount: 10,
  },
};

const RIGHT_ACTION_LABELS: Record<Exclude<ToolbarRightAction, 'none'>, string> = {
  search: 'Search',
  notifications: 'Notifications',
  'notifications-badge': 'Notifications',
  wishlist: 'Wishlist',
  cart: 'Cart',
  'cart-badge': 'Cart',
  account: 'Account',
};

function buildClassName(parts: Array<string | false | null | undefined>) {
  return parts.flat().filter(Boolean).join(' ');
}

function resolveRightActions({
  rightIconSlot1,
  rightIconSlot2,
  rightActions,
  preset,
}: {
  rightIconSlot1?: ToolbarRightIconSlot;
  rightIconSlot2?: ToolbarRightIconSlot;
  rightActions?: ToolbarRightAction[];
  preset?: Omit<ResolvedToolbar, 'centerLabel'>;
}): ToolbarRightAction[] {
  const presetActions = preset?.rightActions ?? ['search', 'cart-badge'];
  const hasSlotProps = rightIconSlot1 !== undefined || rightIconSlot2 !== undefined;

  if (hasSlotProps) {
    const slot1 = rightIconSlot1 ?? presetActions[0] ?? 'search';
    let slot2 = rightIconSlot2 ?? presetActions[1] ?? 'cart-badge';

    if (slot1 === slot2) {
      slot2 = TOOLBAR_RIGHT_ICON_SLOT_OPTIONS.find((action) => action !== slot1)
        ?? 'cart-badge';
    }

    return [slot1, slot2];
  }

  if (rightActions) {
    const [first = 'search', second = 'cart-badge'] = rightActions;
    let slot1 = first === 'none' ? 'search' : first;
    let slot2 = second === 'none'
      ? TOOLBAR_RIGHT_ICON_SLOT_OPTIONS.find((action) => action !== slot1) ?? 'cart-badge'
      : second;

    if (slot1 === slot2) {
      slot2 = TOOLBAR_RIGHT_ICON_SLOT_OPTIONS.find((action) => action !== slot1)
        ?? 'cart-badge';
    }

    return [slot1, slot2];
  }

  return presetActions;
}

function resolveToolbar({
  variant,
  leftAction,
  centerContent,
  centerLabel = 'LABEL',
  rightIconSlot1,
  rightIconSlot2,
  rightActions,
  badgeCount,
}: ToolbarProps): ResolvedToolbar {
  const preset = variant ? VARIANT_PRESETS[variant] : undefined;
  const resolvedLeftAction = leftAction ?? preset?.leftAction ?? 'none';
  const resolvedCenterContent = centerContent ?? preset?.centerContent ?? 'logo';
  const resolvedRightActions = resolveRightActions({
    rightIconSlot1,
    rightIconSlot2,
    rightActions,
    preset,
  });
  const resolvedBadgeCount = badgeCount ?? preset?.badgeCount ?? 10;
  const logoPlacement = preset?.logoPlacement
    ?? (resolvedLeftAction === 'none' && resolvedCenterContent !== 'label' ? 'left' : 'center');

  return {
    leftAction: resolvedLeftAction,
    centerContent: resolvedCenterContent,
    centerLabel,
    logoPlacement,
    rightActions: resolvedRightActions,
    badgeCount: resolvedBadgeCount,
  };
}

function ToolbarBrand({
  centerContent,
  centerLabel,
}: {
  centerContent: ToolbarCenterContent;
  centerLabel: string;
}) {
  if (centerContent === 'label') {
    return (
      <Text
        as="span"
        variant="text-sm"
        weight="medium"
        color="currentColor"
        className="uppercase tracking-[0.2em]"
      >
        {centerLabel}
      </Text>
    );
  }

  if (centerContent === 'mark') {
    return (
      <img
        alt="Superfans"
        className="block h-6 w-[26px] shrink-0 object-contain"
        src={superfansMark}
      />
    );
  }

  return (
    <img
      alt="Superfans"
      className="block h-6 w-auto max-w-[151px] shrink-0 object-contain"
      src={superfansLogoWhite}
    />
  );
}

function formatBadgeCount(badgeCount: number) {
  return badgeCount > 99 ? '99+' : String(badgeCount);
}

function getBadgeClassName(label: string) {
  return label.length > 1
    ? 'size-[18px] text-[8px]'
    : 'size-4 text-[9px]';
}

function getToolbarIconButtonClassName() {
  return buildClassName([
    'storybook-toolbar__icon-button relative inline-flex shrink-0 items-center justify-center p-2',
    'border-0 bg-transparent text-inherit [box-sizing:border-box]',
    'cursor-pointer appearance-none focus-visible:outline-none focus-visible:shadow-focus-brand',
  ]);
}

function ToolbarIconPlaceholder() {
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 p-2 [box-sizing:border-box]">
      <span className="size-6 shrink-0" />
    </span>
  );
}

function ToolbarIconButton({
  ariaLabel,
  badgeCount,
  children,
  onClick,
}: {
  ariaLabel: string;
  badgeCount?: number;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={getToolbarIconButtonClassName()}
      onClick={onClick}
    >
      {children}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={buildClassName([
            'absolute right-0 top-0 box-border flex items-center justify-center rounded-full bg-error-500 font-sans font-medium leading-none text-neutral-0 [box-sizing:border-box]',
            getBadgeClassName(formatBadgeCount(badgeCount)),
          ])}
        >
          {formatBadgeCount(badgeCount)}
        </span>
      )}
    </button>
  );
}

function ToolbarLeftControl({
  action,
  onBack,
  onMenu,
  onNotifications,
}: {
  action: ToolbarLeftAction;
  onBack?: () => void;
  onMenu?: () => void;
  onNotifications?: () => void;
}) {
  if (action === 'none') {
    return null;
  }

  if (action === 'back') {
    return (
      <ToolbarIconButton ariaLabel="Go back" onClick={onBack}>
        <CaretLeft aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
      </ToolbarIconButton>
    );
  }

  if (action === 'notifications') {
    return (
      <ToolbarIconButton ariaLabel="Notifications" onClick={onNotifications}>
        <Bell aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
      </ToolbarIconButton>
    );
  }

  return (
    <ToolbarIconButton ariaLabel="Open menu" onClick={onMenu}>
      <List aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
    </ToolbarIconButton>
  );
}

function ToolbarRightControl({
  action,
  badgeCount,
  onAccount,
  onCart,
  onNotifications,
  onSearch,
  onWishlist,
}: {
  action: ToolbarRightAction;
  badgeCount: number;
  onSearch?: () => void;
  onNotifications?: () => void;
  onWishlist?: () => void;
  onCart?: () => void;
  onAccount?: () => void;
}) {
  if (action === 'none') {
    return <ToolbarIconPlaceholder />;
  }

  const label = RIGHT_ACTION_LABELS[action];

  switch (action) {
    case 'search':
      return (
        <ToolbarIconButton ariaLabel={label} onClick={onSearch}>
          <MagnifyingGlass aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'notifications':
      return (
        <ToolbarIconButton ariaLabel={label} onClick={onNotifications}>
          <Bell aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'notifications-badge':
      return (
        <ToolbarIconButton ariaLabel={label} badgeCount={badgeCount} onClick={onNotifications}>
          <Bell aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'wishlist':
      return (
        <ToolbarIconButton ariaLabel={label} onClick={onWishlist}>
          <Heart aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'cart':
      return (
        <ToolbarIconButton ariaLabel={label} onClick={onCart}>
          <ShoppingCart aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'cart-badge':
      return (
        <ToolbarIconButton ariaLabel={label} badgeCount={badgeCount} onClick={onCart}>
          <ShoppingCart aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    case 'account':
      return (
        <ToolbarIconButton ariaLabel={label} onClick={onAccount}>
          <User aria-hidden="true" className="size-6 shrink-0" size={24} weight="regular" />
        </ToolbarIconButton>
      );
    default:
      return null;
  }
}

function getToolbarShellClassName(className?: string) {
  return buildClassName([
    'storybook-toolbar relative box-border flex h-[60px] w-[375px] max-w-[430px] items-center justify-between px-4 font-sans text-neutral-0 [box-sizing:border-box]',
    'bg-neutral-900',
    className,
  ]);
}

export function Toolbar({
  variant,
  leftAction,
  centerContent,
  centerLabel,
  rightIconSlot1,
  rightIconSlot2,
  rightActions,
  badgeCount,
  className,
  onBack,
  onMenu,
  onSearch,
  onNotifications,
  onWishlist,
  onCart,
  onAccount,
}: ToolbarProps) {
  const resolved = resolveToolbar({
    variant,
    leftAction,
    centerContent,
    centerLabel,
    rightIconSlot1,
    rightIconSlot2,
    rightActions,
    badgeCount,
  });

  return (
    <header className={getToolbarShellClassName(className)}>
      <div className="relative z-[1] flex min-w-10 items-center justify-start">
        <ToolbarLeftControl
          action={resolved.leftAction}
          onBack={onBack}
          onMenu={onMenu}
          onNotifications={onNotifications}
        />
        {resolved.logoPlacement === 'left' && (
          <ToolbarBrand
            centerContent={resolved.centerContent}
            centerLabel={resolved.centerLabel}
          />
        )}
      </div>

      {resolved.logoPlacement === 'center' && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 [transform:translate(-50%,-50%)]">
          <ToolbarBrand
            centerContent={resolved.centerContent}
            centerLabel={resolved.centerLabel}
          />
        </div>
      )}

      <div className="relative z-[1] flex items-center">
        {resolved.rightActions.map((action, index) => (
          <ToolbarRightControl
            key={`${action}-${index}`}
            action={action}
            badgeCount={resolved.badgeCount}
            onAccount={onAccount}
            onCart={onCart}
            onNotifications={onNotifications}
            onSearch={onSearch}
            onWishlist={onWishlist}
          />
        ))}
      </div>
    </header>
  );
}

Toolbar.displayName = 'Toolbar';

export function ToolbarLeftActionPreview({
  action,
}: {
  action: ToolbarLeftAction;
}) {
  return (
    <div className="inline-flex items-center justify-center rounded-2 bg-neutral-100 p-2">
      {action === 'none' ? (
        <ToolbarIconPlaceholder />
      ) : (
        <ToolbarLeftControl action={action} />
      )}
    </div>
  );
}

export function ToolbarCenterContentPreview({
  centerContent,
  centerLabel = 'LABEL',
}: {
  centerContent: ToolbarCenterContent;
  centerLabel?: string;
}) {
  return (
    <div className="inline-flex h-[60px] min-w-[167px] items-center justify-center rounded-2 bg-neutral-900 px-4 text-neutral-0">
      <ToolbarBrand centerContent={centerContent} centerLabel={centerLabel} />
    </div>
  );
}

export function ToolbarRightActionPreview({
  action,
  badgeCount = 10,
}: {
  action: ToolbarRightAction;
  badgeCount?: number;
}) {
  return (
    <div className="inline-flex items-center justify-center rounded-2 bg-neutral-100 p-2">
      <ToolbarRightControl action={action} badgeCount={badgeCount} />
    </div>
  );
}
