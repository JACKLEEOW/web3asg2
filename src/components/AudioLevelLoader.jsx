const BAR_COUNT = 7;

/** `label` documents what is loading at the call site and sets `aria-label` on the loader. */
const AudioLevelLoader = ({ label }) => (
    <div className="audio-level-loader" aria-label={label}>
        {Array.from({ length: BAR_COUNT }, (_, i) => (
            <span key={i} className="audio-level-loader__bar" aria-hidden />
        ))}
    </div>
);

export default AudioLevelLoader;
