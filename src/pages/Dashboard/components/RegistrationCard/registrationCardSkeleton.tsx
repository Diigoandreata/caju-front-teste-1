import Skeleton from "react-loading-skeleton";
import * as S from "./styles";

export const RegistrationCardSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <S.Card key={index}>
      <Skeleton count={3} />

      <S.Actions>
        <Skeleton count={1} />
        <Skeleton count={1} />
        <Skeleton count={1} />
        <Skeleton count={1} />
      </S.Actions>
    </S.Card>
  ));
};
