import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {StyleService,useStyleSheet} from "@ui-kitten/components";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import { LayoutCustom } from "components";
// ----------------------------- Reanimated 2 -----------------------
import Animated, { SharedValue, interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";

interface IProgressBarLeafProps {
  progress: SharedValue<number>;
  length: number;
}

const ProgressBarLeaf = React.memo(
  ({ length, progress }: IProgressBarLeafProps) => {
    const styles = useStyleSheet(themedStyles);
    const _progressImg = useDerivedValue(() => {
      return withTiming(progress.value);
    });

    return (
      <LayoutCustom style={styles.container} horizontal>
        {[...new Array(length)].map((item, index) => {
          const styled = useAnimatedStyle(() => {
            const bg = interpolateColor(
              progress.value,
              [index - 1, index, index + 1],
              ["#C7E3DC", "#008F72", "#008F72"]
            );
            const _width = interpolate(
              progress.value,
              [index - 1, index, index + 1],
              [0, 99, 99]
            );
            return {
              backgroundColor: bg,
              height: 3,
              width: _width,
              position: "absolute",
              zIndex: 100,
              top: 24,
              borderRadius: 99,
            };
          });
          const styledImg = useAnimatedStyle(() => {
            const bg = interpolateColor(
              _progressImg.value,
              [index - 1, index, index + 1],
              ["#C7E3DC", "#008F72", "#008F72"]
            );
            return {
              tintColor: bg,
              marginTop: -22,
              marginLeft: -4,
            };
          });
          const styledImg2 = useAnimatedStyle(() => {
            const bg = interpolateColor(
              _progressImg.value,
              [index - 1, index, index + 1],
              ["#C7E3DC", "#008F72", "#008F72"]
            );
            return {
              tintColor: bg,
              transform: [{ rotateX: "180deg" }],
              marginLeft: -4,
            };
          });
          return (
            <LayoutCustom key={index} horizontal pt={24}>
              <LayoutCustom style={styles.indicator} />
              <Animated.View style={styled} />
              {index % 2 === 0 ? (
                <Animated.Image
                  source={Images.finance.leaf}
                  style={styledImg}
                />
              ) : (
                <Animated.Image
                  source={Images.finance.leaf}
                  style={styledImg2}
                />
              )}
            </LayoutCustom>
          );
        })}
      </LayoutCustom>
    );
  }
);

export default ProgressBarLeaf;

const themedStyles = StyleService.create({
  container: {
    justifyContent: "center",
  },
  content: {},
  indicator: {
    width: 99,
    height: 3,
    backgroundColor: "#C7E3DC",
    borderRadius: 99,
  },
});
