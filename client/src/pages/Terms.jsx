export default function Terms() {
  const sections = [
    {
      heading: "General",
      items: [
        "This site showcases artwork by Barsha Yadav, including both original pieces and reproductions/prints. Each piece's listing will indicate whether it is an original work or a print — please check before bidding or inquiring.",
        "All content, images, and writing on this site are copyright Barsha Yadav unless otherwise noted. Reproduction or redistribution without permission is not permitted.",
        "Due to variations in lighting, screen calibration, and photography, the colors and textures of a painting as shown on this site may differ slightly from the piece in person. This is normal for physical artwork and is not grounds for cancelling a completed purchase.",
      ],
    },
    {
      heading: "Auctions",
      items: [
        "Auctions display a reserve price set by the artist. Bids must exceed the current highest bid to be accepted.",
        "Placing a winning bid is a binding commitment to purchase. Once an auction closes and you are the highest bidder, you are required to complete the purchase — bids cannot be withdrawn or cancelled after winning.",
        "The artist reserves the right to cancel or extend an auction prior to its close, at her discretion.",
        "Shipping costs and availability (including international shipping) will be discussed directly with the winning bidder after the auction closes; they are not included in the bid amount unless stated otherwise.",
        "Payment must be completed within 5 days of being contacted as the winning bidder. Failure to complete payment within this window may result in forfeiture of the piece and it being offered to the next-highest bidder.",
      ],
    },
    {
      heading: "Privacy",
      items: [
        "Bidder name and email are collected solely to contact you regarding your bid and are not shared with third parties.",
        "No payment information is collected through this site directly.",
      ],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 min-h-screen">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-6 font-semibold leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-stone-500 leading-relaxed">
          Please read these terms carefully before placing a bid or using this site.
          By engaging with this site, you agree to the following.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-200 mb-14" />

      {/* Sections */}
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl text-stone-800 mb-6 font-semibold">
              {section.heading}
            </h2>
            <ul className="space-y-4">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  {/* Terracotta bullet dot */}
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-terracotta opacity-60" />
                  <p className="text-stone-600 leading-relaxed text-[15px]">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-stone-200 mt-16 pt-8 text-stone-400 text-xs">
        Last updated August 2026 &mdash; Ochre &amp; Ink / Barsha Yadav.
      </div>
    </div>
  );
}
