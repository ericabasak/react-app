import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent
} from 'carbon-components-react';
import {
    AppSwitcher20,
    Notification20,
    UserAvatar20,
  } from '@carbon/icons-react';

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="IBM Systems">
          OneCloud
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Deploy</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Projects</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Requests</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Help</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Admin</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Quick links</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
                <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User Avatar">
                <UserAvatar20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher">
                <AppSwitcher20 />
            </HeaderGlobalAction>
        </HeaderGlobalBar>      
        </Header>
    )}
  />
);

export default TutorialHeader;