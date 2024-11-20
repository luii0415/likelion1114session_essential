"use client";
// 실행하려면 npm run dev로 실행해야 함
import { useEffect, useState } from "react";
import StyledFont from "./components/StyledFont";
import StyledColumn from "./components/StyledColumn";
import StyledGrid from "./components/StyledGrid";
import { fetchNowPlayingMovies } from "@/lib/apiClient";

export default function MoviePage() {
  const [movies, setMovies] = useState<any[]>([]); // 영화 데이터를 저장할 상태 변수
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // 이미지 URL 기본 경로

  useEffect(() => {
    async function loadMovies() {
      try {
        const moviesData = await fetchNowPlayingMovies();
        setMovies(moviesData);
        console.log(moviesData); // fetchNowPlayingMovies가 비동기 함수라서.. movies Data에 들어오기 전에, setMovies가 실행되는 것 같다고.. 하심..
      } catch (error) {
        console.error(error);
      }
    }

    loadMovies();
  }, []);

  return (
    <StyledColumn
      $width="100%"
      $alignitems="center"
      $justifycontent="center"
      $gap="1rem"
    >
      <StyledFont $color="white" $font="2rem" $fontweight="bold">
        현재 상영 중인 영화
      </StyledFont>
      <StyledGrid $columns="repeat(auto-fill, minmax(200px, 1fr))" $gap="15px">
        {movies.map((movie) => (
          <StyledColumn key={movie.id} $alignitems="center" $gap="11px">
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <StyledFont $color="white" $font="15px" $fontweight="bold">
              {movie.title}
            </StyledFont>
          </StyledColumn>
        ))}
      </StyledGrid>
    </StyledColumn>
  );
}
