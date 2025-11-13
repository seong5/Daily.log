import { colors } from '@/constants/colors'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export default function FeedCardSkeleton() {
  const shimmerAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    )
    shimmer.start()

    return () => shimmer.stop()
  }, [shimmerAnim])

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 프로필 영역 */}
        <View style={styles.profileContainer}>
          <Animated.View style={[styles.skeletonCircle, { opacity }]} />
          <View style={styles.profileTextContainer}>
            <Animated.View style={[styles.skeletonLine, styles.skeletonLineSmall, { opacity }]} />
            <Animated.View style={[styles.skeletonLine, styles.skeletonLineTiny, { opacity }]} />
          </View>
        </View>

        {/* 제목 */}
        <Animated.View style={[styles.skeletonLine, styles.skeletonTitle, { opacity }]} />

        {/* 설명 */}
        <Animated.View style={[styles.skeletonLine, styles.skeletonDescription, { opacity }]} />
        <Animated.View
          style={[styles.skeletonLine, styles.skeletonDescriptionShort, { opacity }]}
        />

        {/* 이미지 영역 */}
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.skeletonImage, { opacity }]} />
        </View>
      </View>

      {/* 메뉴 영역 */}
      <View style={styles.menuContent}>
        <View style={styles.menu}>
          <Animated.View style={[styles.skeletonIcon, { opacity }]} />
          <Animated.View style={[styles.skeletonText, { opacity }]} />
        </View>
        <View style={styles.menu}>
          <Animated.View style={[styles.skeletonIcon, { opacity }]} />
          <Animated.View style={[styles.skeletonText, { opacity }]} />
        </View>
        <View style={styles.menu}>
          <Animated.View style={[styles.skeletonIcon, { opacity }]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.GRAY_200,
  },
  profileTextContainer: {
    flex: 1,
    gap: 6,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.GRAY_200,
  },
  skeletonLineSmall: {
    width: 80,
    height: 14,
  },
  skeletonLineTiny: {
    width: 120,
    height: 12,
  },
  skeletonTitle: {
    width: '70%',
    height: 20,
    marginVertical: 8,
  },
  skeletonDescription: {
    width: '100%',
    height: 16,
    marginBottom: 8,
  },
  skeletonDescriptionShort: {
    width: '60%',
    height: 16,
    marginBottom: 14,
  },
  imageContainer: {
    marginTop: 8,
  },
  skeletonImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: colors.GRAY_200,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.GRAY_100,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  skeletonIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.GRAY_200,
  },
  skeletonText: {
    width: 20,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.GRAY_200,
  },
})
