import { TextPage } from "@/components/TextPage";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "投稿する（うちの子の写真の送りかた）",
  description: `${SITE.name}に、うちの子の写真とひとことを投稿する方法と、載せるときの決まりです。`,
  path: "/join/",
});

export default function JoinPage() {
  return (
    <TextPage
      crumbs={[{ href: "/join/", label: "投稿する" }]}
      title={
        <>
          うちの子の今日を、
          {/* 「のせませんか」の途中で折れないように、ひとかたまりにする */}
          <span className="inline-block">のせませんか。</span>
        </>
      }
      lead={<p>特別な日でなくてかまいません。さんぽの途中、ごはんの前、ねているところ。なんでもない1枚を、ひとことと一緒に送ってください。</p>}
    >
      <section aria-labelledby="who">
        <h2 id="who">投稿できる方</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>ペットと一緒に暮らしている方。犬、猫、うさぎ、鳥、ハムスターなど、種類は問いません。</li>
          <li>費用はかかりません。1回だけの投稿も、毎日の投稿も歓迎します。</li>
        </ul>
      </section>

      <section aria-labelledby="what">
        <h2 id="what">送っていただくもの</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>写真（1〜10枚）。縦向きの写真がきれいに載ります。</li>
          <li>ひとこと（その日のできごとを、短くて大丈夫です）。</li>
          <li>うちの子の名前、種類、生まれた年と月（わかる範囲で）。</li>
          <li>載せるときのニックネーム、お住まいの都道府県。</li>
        </ul>
      </section>

      <section aria-labelledby="flow">
        <h2 id="flow">載るまでの流れ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>下のフォームから、写真とひとことを送ってください。</li>
          <li>内容を確認し、{SITE.name}に載せます。はじめての投稿のときに、うちの子のページを作ります。</li>
          <li>2回目からは、同じ子のページに1枚ずつ重なっていきます。</li>
        </ol>
      </section>

      <section aria-labelledby="rules">
        <h2 id="rules">お願いしたいこと</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>ご自身で撮った写真を送ってください。</li>
          <li>人の顔、表札、車のナンバー、住所がわかるものが写っていない写真をお選びください。</li>
          <li>動物がいやがっていたり、危ない目にあっていたりする写真は載せません。</li>
          <li>載せた投稿を消したいときは、お問い合わせフォームからご連絡ください。</li>
        </ul>
      </section>

      <section aria-labelledby="send">
        <h2 id="send">投稿はこちらから</h2>
        <p>
          <a href={SITE.postFormUrl} target="_blank" rel="noopener" className="btn-primary">
            投稿フォームをひらく
            <span className="sr-only">（新しいタブで開きます）</span>
          </a>
        </p>
      </section>
    </TextPage>
  );
}
