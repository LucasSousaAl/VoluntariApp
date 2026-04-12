import { useState } from "react";

type Localizacao = {
  latitude: number;
  longitude: number;
};

export default function Vagas() {
  const [localizacao, setLocalizacao] = useState<Localizacao | null>(null);
  const [erro, setErro] = useState<string>("");

  const pegarLocalizacao = (): void => {
    if (!navigator.geolocation) {
      setErro("Geolocalização não suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocalizacao({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: GeolocationPositionError) => {
        setErro("Não foi possível obter sua localização.");
        console.error(error);
      }
    );
  };

  return (
    <div>
      <button onClick={pegarLocalizacao}>
        Encontrar vagas perto de mim
      </button>

      {localizacao && (
        <p>
          Latitude: {localizacao.latitude} <br />
          Longitude: {localizacao.longitude}
        </p>
      )}

      {erro && <p>{erro}</p>}
    </div>
  );
}