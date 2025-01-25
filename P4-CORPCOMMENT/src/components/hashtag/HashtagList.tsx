import HashtagItem from "./HashtagItem";

type HashtagListType = {
  companyList: string[],
  handleSelectCompany:(company: string) => void 
};

export default function HashtagList({ companyList, handleSelectCompany }: HashtagListType) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => <HashtagItem key={company} company={company} onSelectCompany={handleSelectCompany} />)}
    </ul>
  );
}
