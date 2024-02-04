const Section = styled.div`
 .containe{
    display: flex;
    justify-content: space-between;
 }

 .containe div{
    width: 80%
 }
`;
return(<>
    <Section>
        <div className="containe">
            <div>
                <Widget src="akinyemisaheedwale5.near/widget/columnOne" props={{colum: 1}}/>
            </div>
            <div>
                <Widget src="akinyemisaheedwale5.near/widget/columnOne" props={{colum: 2}}/>
            </div>
            <div>
                <Widget src="akinyemisaheedwale5.near/widget/columnOne" props={{colum: 3}}/>
            </div>
        </div>
    </Section>
</>)