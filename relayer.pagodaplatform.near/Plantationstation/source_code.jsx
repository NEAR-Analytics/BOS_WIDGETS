const styles = {};

const Theme = styled.div`
  /* fonts */
  --font-inter: Inter;

  /* font sizes */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-xl: 20px;

  /* Colors */
  --color-gray-100: #151515;
  --color-gray-200: #111;
  --color-darkslategray: #303030;
  --color-darkgray: #999;
  --color-white: #fff;
  --color-black: #000;
  --color-dimgray: #666;

  /* Gaps */
  --gap-base: 16px;
  --gap-5xl: 24px;

  /* Paddings */
  --padding-xs: 12px;
  --padding-base: 16px;
  --padding-5xs: 8px;

  /* border radiuses */
  --br-xs: 12px;
  --br-5xl: 24px;

.frameChild {
  position: relative;
  width: 28.87px;
  height: 32px;
  z-index: 0;
}
.plantationstation {
  position: relative;
  z-index: 1;
}
.frameItem {
  position: absolute;
  margin: 0 !important;
  top: 5.11px;
  left: 3.54px;
  border-radius: 50%;
  background-color: var(--color-gray-100);
  width: 21.78px;
  height: 21.78px;
  z-index: 2;
}
.groupParent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
}
.groupParent,
.home {
  position: relative;
}
.frameGroup,
.homeParent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.homeParent {
  gap: 21px;
  font-size: var(--font-size-base);
}
.frameGroup {
  gap: 48px;
}
.adamSmith {
  position: relative;
  font-weight: 500;
}
.adamSmithWrapper {
  border-radius: 8px;
  border: 1px solid var(--color-darkgray);
  display: flex;
  flex-direction: row;
  padding: var(--padding-5xs) var(--padding-base);
  align-items: flex-start;
  justify-content: flex-start;
}
.settings {
  position: relative;
  font-size: var(--font-size-base);
}
.frameContainer,
.frameParent {
  display: flex;
  flex-direction: column;
}
.frameContainer {
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  color: var(--color-darkgray);
}
.frameParent {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-gray-100);
  width: 200px;
  height: 1024px;
  padding: 32px 24px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.home1 {
  position: absolute;
  top: 56px;
  left: 240px;
  font-size: 24px;
  color: var(--color-dimgray);
}
.mintNewPlantWrapper,
.yourPlantsParent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mintNewPlantWrapper {
  border-radius: var(--br-xs);
  background-color: var(--color-white);
  width: 167px;
  height: 50px;
  padding: var(--padding-xs) var(--padding-base);
  box-sizing: border-box;
  justify-content: center;
  font-size: var(--font-size-base);
  color: var(--color-black);
}
.yourPlantsParent {
  position: absolute;
  top: 102px;
  left: 240px;
  width: 1160px;
  justify-content: space-between;
  font-size: 32px;
}
.growingPlantsWrapper {
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-base);
  align-items: flex-start;
  justify-content: flex-start;
}
.readyToHarvest {
  position: relative;
  color: var(--color-dimgray);
}
.frameParent1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--gap-5xl);
}
.instanceChild {
  align-self: stretch;
  flex: 1;
  position: relative;
  border-radius: var(--br-5xl);
}
.growing43Wrapper,
.x786c65d37e5c2Parent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.x786c65d37e5c2Parent {
  align-self: stretch;
  justify-content: space-between;
}
.growing43Wrapper {
  flex: 1;
  border-radius: var(--br-xs);
  background-color: var(--color-darkslategray);
  padding: var(--padding-xs) var(--padding-base);
  justify-content: center;
}
.frameWrapper {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.rectangleParent {
  cursor: pointer;
}
.rectangleGroup,
.rectangleParent {
  flex: 1;
  height: 401px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
}
.instanceParent {
  width: 1160px;
  height: 365.5px;
  display: flex;
  flex-direction: row;
  gap: var(--gap-5xl);
  font-size: var(--font-size-sm);
  color: var(--color-darkgray);
}
.dashboardInner,
.frameDiv,
.instanceParent {
  align-items: flex-start;
  justify-content: flex-start;
}
.frameDiv {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.dashboardInner {
  position: absolute;
  top: 203px;
  left: 240px;
  font-size: var(--font-size-xl);
}
.dashboardInner,
.rectangleParent2,
.wrapper {
  display: flex;
  flex-direction: column;
}
.wrapper {
  position: absolute;
  top: 204px;
  left: 605px;
  border-radius: 30px;
  background-color: var(--color-white);
  width: 24px;
  height: 24px;
  padding: var(--padding-5xs);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-base);
  color: var(--color-black);
}
.rectangleParent2 {
  flex: 1;
  height: 531px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
}
.dashboard,
.dashboardChild {
  background-color: var(--color-gray-200);
  height: 1024px;
}
.dashboardChild {
  position: absolute;
  top: 0;
  left: 1464px;
  width: 504px;
  display: flex;
  flex-direction: row;
  padding: 40px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color-darkgray);
}
.dashboard {
  position: relative;
  width: 100%;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-white);
  font-family: var(--font-inter);
}`;

return (
  <Theme>
    <div className="dashboard">
      <div className="frameParent">
        <div className="frameGroup">
          <div className="groupParent">
            <img className="frameChild" alt="" src="/group-1.svg" />
            <b className="plantationstation">{`PlantationStation `}</b>
            <div className="frameItem" />
          </div>
          <div className="homeParent">
            <div className="home">Home</div>
            <div className="home">Analytics</div>
            <div className="home">Marketplace</div>
          </div>
        </div>
        <div className="frameContainer">
          <div className="adamSmithWrapper">
            <div className="adamSmith">Adam Smith</div>
          </div>
          <div className="settings">Settings</div>
        </div>
      </div>
      <div className="home1">Home</div>
      <div className="yourPlantsParent">
        <div className="home">Your plants</div>
        <div className="mintNewPlantWrapper">
          <div className="adamSmith">Mint new plant</div>
        </div>
      </div>
      <div className="dashboardInner">
        <div className="frameDiv">
          <div className="frameParent1">
            <div className="growingPlantsWrapper">
              <div className="home">Growing plants</div>
            </div>
            <div className="readyToHarvest">Ready to harvest</div>
          </div>
          <div className="instanceParent">
            <div className="rectangleParent" onClick={onFrameContainer13Click}>
              <div className="instanceChild" />
              <div className="settings">Plant name</div>
              <div className="x786c65d37e5c2Parent">
                <div className="home">0x786c65d....37e5c2</div>
                <div className="home">Show all</div>
              </div>
              <div className="frameWrapper">
                <div className="growing43Wrapper">
                  <div className="adamSmith">Growing (43%)</div>
                </div>
              </div>
            </div>
            <div className="rectangleGroup">
              <div className="instanceChild" />
              <div className="settings">Plant name</div>
              <div className="x786c65d37e5c2Parent">
                <div className="home">0x786c65d....37e5c2</div>
                <div className="home">Show all</div>
              </div>
              <div className="frameWrapper">
                <div className="growing43Wrapper">
                  <div className="adamSmith">Growing (43%)</div>
                </div>
              </div>
            </div>
            <div className="rectangleGroup">
              <div className="instanceChild" />
              <div className="settings">Plant name</div>
              <div className="x786c65d37e5c2Parent">
                <div className="home">0x786c65d....37e5c2</div>
                <div className="home">Show all</div>
              </div>
              <div className="frameWrapper">
                <div className="growing43Wrapper">
                  <div className="adamSmith">Growing (43%)</div>
                </div>
              </div>
            </div>
            <div className="rectangleGroup">
              <div className="instanceChild" />
              <div className="settings">Plant name</div>
              <div className="x786c65d37e5c2Parent">
                <div className="home">0x786c65d....37e5c2</div>
                <div className="home">Show all</div>
              </div>
              <div className="frameWrapper">
                <div className="growing43Wrapper">
                  <div className="adamSmith">Growing (43%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="home">4</div>
      </div>
      <div className="dashboardChild">
        <div className="rectangleParent2">
          <div className="instanceChild" />
          <div className="settings">Plant name</div>
          <div className="x786c65d37e5c2Parent">
            <div className="home">0x786c65d....37e5c2</div>
            <div className="home">Show all</div>
          </div>
          <div className="frameWrapper">
            <div className="growing43Wrapper">
              <div className="adamSmith">Growing (43%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
