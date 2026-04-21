import { MapPin } from "lucide-react";

export default function MapThumbnail({
  address,
  zoom = 15,
  height = 220,
}: {
  address: string;
  zoom?: number;
  height?: number;
}) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_API_KEY;
  const encoded = encodeURIComponent(address);

  if (!key) {
    return (
      <div
        className="w-full rounded-lg flex items-center justify-center text-center px-4"
        style={{
          height,
          background:
            "repeating-linear-gradient(45deg, var(--mx-primary-soft) 0 12px, #fff 12px 24px)",
          border: "1px solid var(--mx-line)",
        }}
      >
        <div>
          <MapPin
            className="w-5 h-5 mx-auto mb-1"
            style={{ color: "var(--mx-primary)" }}
          />
          <div className="text-sm font-medium">{address}</div>
          <div className="text-xs mx-ink-soft mt-1">
            Map preview pending NEXT_PUBLIC_GOOGLE_MAPS_STATIC_API_KEY
          </div>
        </div>
      </div>
    );
  }

  const src = `https://maps.googleapis.com/maps/api/staticmap?center=${encoded}&zoom=${zoom}&size=640x${height}&scale=2&maptype=roadmap&markers=color:0x1e3a8a%7C${encoded}&key=${key}`;

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={`Map near ${address}`}
      width={640}
      height={height}
      className="w-full rounded-lg object-cover"
      style={{ height }}
    />
  );
}
