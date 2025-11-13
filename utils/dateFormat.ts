/**
 * 날짜를 상대 시간 또는 절대 시간으로 포맷팅합니다.
 * 최근 것: "몇 분 전", "몇 시간 전", "몇 일 전"
 * 오래된 것: "YYYY년 MM월 DD일" 형식
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // 1분 미만
  if (diffInSeconds < 60) {
    return '방금 전'
  }

  // 1시간 미만
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  }

  // 24시간 미만
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  }

  // 7일 미만
  if (diffInDays < 7) {
    return `${diffInDays}일 전`
  }

  // 7일 이상이면 연월일 형식으로 표시
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}
